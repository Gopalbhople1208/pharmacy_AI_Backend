from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta

from models.pharmacy import (
    Medicine,
    Inventory,
    Sale,
    SaleItem,
)


# ==========================================
# Medicine Stock
# ==========================================

def get_medicine_stock(
    db: Session,
    medicine_name: str
):

    medicine = (
        db.query(Medicine)
        .filter(
            Medicine.medicine_name.ilike(
                f"%{medicine_name}%"
            )
        )
        .first()
    )

    if not medicine:
        return None

    inventory = (
        db.query(Inventory)
        .filter(
            Inventory.medicine_id == medicine.id
        )
        .first()
    )

    stock = (
        inventory.current_stock
        if inventory
        else 0
    )

    return {
        "medicine_name": medicine.medicine_name,
        "generic_name": medicine.generic_name,
        "manufacturer": medicine.manufacturer,
        "current_stock": stock,
        "selling_price": medicine.selling_price,
        "expiry_date": (
            str(medicine.expiry_date)
            if medicine.expiry_date
            else None
        )
    }


# ==========================================
# Low Stock
# ==========================================

def get_low_stock(db: Session):

    records = (
        db.query(Medicine, Inventory)
        .join(
            Inventory,
            Medicine.id == Inventory.medicine_id
        )
        .filter(
            Inventory.current_stock
            <= Inventory.reorder_level
        )
        .all()
    )

    result = []

    for medicine, inventory in records:

        result.append({
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "reorder_level": inventory.reorder_level
        })

    return result


# ==========================================
# Expired Medicines
# ==========================================

def get_expired_medicines(db: Session):

    today = date.today()

    records = (
        db.query(Medicine)
        .filter(
            Medicine.expiry_date < today
        )
        .all()
    )

    result = []

    for medicine in records:

        result.append({
            "medicine_name": medicine.medicine_name,
            "expiry_date": str(
                medicine.expiry_date
            )
        })

    return result


# ==========================================
# Near Expiry Medicines
# ==========================================

def get_near_expiry_medicines(db: Session):

    today = date.today()

    next_30_days = (
        today + timedelta(days=30)
    )

    records = (
        db.query(Medicine)
        .filter(
            Medicine.expiry_date >= today,
            Medicine.expiry_date <= next_30_days
        )
        .all()
    )

    result = []

    for medicine in records:

        result.append({
            "medicine_name": medicine.medicine_name,
            "expiry_date": str(
                medicine.expiry_date
            )
        })

    return result


# ==========================================
# Today's Sales
# ==========================================

def get_today_sales(db: Session):

    today = date.today()

    total = (
        db.query(
            func.sum(Sale.total_amount)
        )
        .filter(
            Sale.sale_date == today
        )
        .scalar()
    )

    return total or 0


# ==========================================
# Top Selling Medicines
# ==========================================

def get_top_selling_medicines(
    db: Session
):

    results = (
        db.query(
            Medicine.medicine_name,
            func.sum(
                SaleItem.quantity
            ).label("total_quantity")
        )
        .join(
            SaleItem,
            Medicine.id == SaleItem.medicine_id
        )
        .group_by(
            Medicine.id,
            Medicine.medicine_name
        )
        .order_by(
            func.sum(
                SaleItem.quantity
            ).desc()
        )
        .limit(10)
        .all()
    )

    return [
        {
            "medicine_name": name,
            "quantity_sold": quantity
        }
        for name, quantity in results
    ]


# ==========================================
# AI Pharmacy Query Processor
# ==========================================
def process_pharmacy_query(db: Session, message: str):

    question = message.lower().strip()

    # ---------------------------------------------
    # Medicine Stock
    # ---------------------------------------------

    if "stock" in question or "available" in question or "availability" in question:

        # First try to find the medicine directly
        medicines = (
            db.query(Medicine)
            .filter(
                Medicine.medicine_name.ilike(
                    f"%{question.replace('what is the stock of', '').replace('what is the stock of', '').replace('?', '').strip()}%"
                )
            )
            .all()
        )

        # If direct search fails, search individual words
        if not medicines:

            words = question.replace("?", "").split()

            ignored_words = {
                "what",
                "is",
                "the",
                "stock",
                "of",
                "current",
                "available",
                "availability",
                "medicine",
                "medicines",
                "please",
                "show",
                "me",
                "how",
                "much"
            }

            for word in words:

                if len(word) < 3 or word in ignored_words:
                    continue

                medicines = (
                    db.query(Medicine)
                    .filter(
                        Medicine.medicine_name.ilike(
                            f"%{word}%"
                        )
                    )
                    .all()
                )

                if medicines:
                    break

        results = []

        for medicine in medicines:

            inventory = (
                db.query(Inventory)
                .filter(
                    Inventory.medicine_id == medicine.id
                )
                .first()
            )

            if inventory:

                results.append({
                    "medicine_id": medicine.id,
                    "medicine_name": medicine.medicine_name,
                    "generic_name": medicine.generic_name,
                    "manufacturer": medicine.manufacturer,
                    "current_stock": inventory.current_stock,
                    "reorder_level": inventory.reorder_level,
                    "selling_price": medicine.selling_price,
                    "expiry_date": (
                        str(medicine.expiry_date)
                        if medicine.expiry_date
                        else None
                    )
                })

        if results:

            return {
                "type": "database",
                "data": results
            }

    # ---------------------------------------------
    # Low Stock
    # ---------------------------------------------

    if "low stock" in question:

        return {
            "type": "database",
            "data": get_low_stock(db)
        }

    # ---------------------------------------------
    # Expired
    # ---------------------------------------------

    if "expired" in question:

        return {
            "type": "database",
            "data": get_expired_medicines(db)
        }

    # ---------------------------------------------
    # Near Expiry
    # ---------------------------------------------

    if (
        "near expiry" in question
        or "next 30 days" in question
        or "expire soon" in question
    ):

        return {
            "type": "database",
            "data": get_near_expiry_medicines(db)
        }

    # ---------------------------------------------
    # Today's Sales
    # ---------------------------------------------

    if (
        "today sales" in question
        or "today's sales" in question
        or "aaj ki sales" in question
    ):

        return {
            "type": "database",
            "data": {
                "today_sales": get_today_sales(db)
            }
        }

    # ---------------------------------------------
    # Top Selling
    # ---------------------------------------------

    if (
        "top selling" in question
        or "most sold" in question
        or "sabse zyada" in question
    ):

        return {
            "type": "database",
            "data": get_top_selling_medicines(db)
        }

    return None