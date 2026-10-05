from datetime import date, timedelta

from sqlalchemy.orm import Session
from sqlalchemy import func

from models.pharmacy import (
    Medicine,
    Inventory,
    Vendor,
    Customer,
    Purchase,
    PurchaseItem,
    Sale,
    SaleItem,
    Prescription,
)


# ==========================================================
# FIND MEDICINES
# ==========================================================

def find_medicines(db: Session, message: str):

    words = message.lower().split()

    ignored_words = {
        "what",
        "what's",
        "is",
        "the",
        "of",
        "for",
        "show",
        "me",
        "give",
        "tell",
        "stock",
        "available",
        "availability",
        "expiry",
        "date",
        "medicine",
        "medicines",
        "details",
        "please",
        "current",
        "price",
        "selling",
        "purchase",
        "vendor",
        "supplier",
        "information",
    }

    search_words = [
        word.strip("?,.!") 
        for word in words
        if len(word.strip("?,.!")) >= 3
        and word.strip("?,.!") not in ignored_words
    ]

    medicines = []

    for word in search_words:

        results = (
            db.query(Medicine)
            .filter(
                Medicine.medicine_name.ilike(
                    f"%{word}%"
                )
            )
            .limit(20)
            .all()
        )

        medicines.extend(results)

    unique = {}

    for medicine in medicines:
        unique[medicine.id] = medicine

    return list(unique.values())


# ==========================================================
# MEDICINE INFORMATION
# ==========================================================

def get_medicine_information(db: Session, message: str):

    medicines = find_medicines(db, message)

    result = []

    for medicine in medicines:

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.medicine_id == medicine.id
            )
            .first()
        )

        vendor = None

        if medicine.vendor_id:

            vendor = (
                db.query(Vendor)
                .filter(
                    Vendor.id == medicine.vendor_id
                )
                .first()
            )

        result.append({
            "medicine_id": medicine.id,
            "medicine_name": medicine.medicine_name,
            "generic_name": medicine.generic_name,
            "brand_name": medicine.brand_name,
            "category": medicine.category,
            "dosage_form": medicine.dosage_form,
            "strength": medicine.strength,
            "manufacturer": medicine.manufacturer,

            "current_stock": (
                inventory.current_stock
                if inventory
                else 0
            ),

            "reorder_level": (
                inventory.reorder_level
                if inventory
                else medicine.reorder_level
            ),

            "selling_price": medicine.selling_price,
            "purchase_price": medicine.purchase_price,

            "expiry_date": (
                str(medicine.expiry_date)
                if medicine.expiry_date
                else None
            ),

            "vendor": (
                vendor.vendor_name
                if vendor
                else None
            ),

            "vendor_phone": (
                vendor.phone
                if vendor
                else None
            ),

            "vendor_city": (
                vendor.city
                if vendor
                else None
            ),
        })

    return result


# ==========================================================
# LOW STOCK
# ==========================================================

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

    return [
        {
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "reorder_level": inventory.reorder_level,
        }
        for medicine, inventory in records
    ]


# ==========================================================
# EXPIRED MEDICINES
# ==========================================================

def get_expired_medicines(db: Session):

    today = date.today()

    records = (
        db.query(Medicine)
        .filter(
            Medicine.expiry_date < today
        )
        .all()
    )

    return [
        {
            "medicine_name": medicine.medicine_name,
            "expiry_date": str(medicine.expiry_date),
        }
        for medicine in records
    ]


# ==========================================================
# NEAR EXPIRY
# ==========================================================

def get_near_expiry_medicines(db: Session):

    today = date.today()
    next_30_days = today + timedelta(days=30)

    records = (
        db.query(Medicine)
        .filter(
            Medicine.expiry_date >= today,
            Medicine.expiry_date <= next_30_days,
        )
        .all()
    )

    return [
        {
            "medicine_name": medicine.medicine_name,
            "expiry_date": str(medicine.expiry_date),
        }
        for medicine in records
    ]


# ==========================================================
# VENDORS
# ==========================================================

def get_vendors(db: Session):

    vendors = (
        db.query(Vendor)
        .all()
    )

    return [
        {
            "vendor_id": vendor.id,
            "vendor_name": vendor.vendor_name,
            "contact_person": vendor.contact_person,
            "phone": vendor.phone,
            "email": vendor.email,
            "city": vendor.city,
            "status": vendor.status,
        }
        for vendor in vendors
    ]


# ==========================================================
# CUSTOMERS
# ==========================================================

def get_customers(db: Session):

    customers = (
        db.query(Customer)
        .all()
    )

    return [
        {
            "customer_id": customer.id,
            "customer_name": customer.customer_name,
            "phone": customer.phone,
            "email": customer.email,
            "address": customer.address,
            "city": customer.city,
        }
        for customer in customers
    ]


# ==========================================================
# TODAY SALES
# ==========================================================

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

    return {
        "date": str(today),
        "total_sales": total or 0
    }


# ==========================================================
# TOP SELLING MEDICINES
# ==========================================================

def get_top_selling(db: Session):

    results = (
        db.query(
            Medicine.medicine_name,
            func.sum(
                SaleItem.quantity
            ).label("quantity_sold")
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
            "quantity_sold": quantity,
        }
        for name, quantity in results
    ]


# ==========================================================
# PURCHASES
# ==========================================================

def get_purchases(db: Session):

    purchases = (
        db.query(Purchase)
        .order_by(
            Purchase.purchase_date.desc()
        )
        .limit(20)
        .all()
    )

    result = []

    for purchase in purchases:

        vendor = (
            db.query(Vendor)
            .filter(
                Vendor.id == purchase.vendor_id
            )
            .first()
        )

        result.append({
            "purchase_id": purchase.id,
            "purchase_date": str(
                purchase.purchase_date
            ),
            "vendor": (
                vendor.vendor_name
                if vendor
                else None
            ),
            "total_amount": purchase.total_amount,
        })

    return result


# ==========================================================
# PRESCRIPTIONS
# ==========================================================

def get_prescriptions(db: Session):

    prescriptions = (
        db.query(Prescription)
        .order_by(
            Prescription.prescription_date.desc()
        )
        .limit(20)
        .all()
    )

    result = []

    for prescription in prescriptions:

        customer = (
            db.query(Customer)
            .filter(
                Customer.id
                == prescription.customer_id
            )
            .first()
        )

        result.append({
            "prescription_id": prescription.id,
            "prescription_number":
                prescription.prescription_number,
            "prescription_date":
                str(prescription.prescription_date)
                if prescription.prescription_date
                else None,
            "doctor_name":
                prescription.doctor_name,
            "customer":
                customer.customer_name
                if customer
                else None,
            "notes":
                prescription.notes,
        })

    return result


# ==========================================================
# MAIN PHARMACY QUERY PROCESSOR
# ==========================================================

def process_pharmacy_query(
    db: Session,
    message: str
):

    question = message.lower().strip()

    # ------------------------------------------------------
    # LOW STOCK
    # ------------------------------------------------------

    if (
        "low stock" in question
        or "low-stock" in question
        or "reorder" in question
    ):

        return {
            "type": "database",
            "category": "low_stock",
            "data": get_low_stock(db)
        }


    # ------------------------------------------------------
    # EXPIRED
    # ------------------------------------------------------

    if (
        "expired" in question
        or "expiry" in question
        or "expiration" in question
    ):

        medicines = find_medicines(
            db,
            message
        )

        # If a specific medicine is mentioned
        if medicines:

            data = []

            for medicine in medicines:

                data.append({
                    "medicine_name":
                        medicine.medicine_name,

                    "expiry_date":
                        str(medicine.expiry_date)
                        if medicine.expiry_date
                        else None
                })

        else:

            data = get_expired_medicines(db)

        return {
            "type": "database",
            "category": "expiry",
            "data": data
        }


    # ------------------------------------------------------
    # NEAR EXPIRY
    # ------------------------------------------------------

    if (
        "near expiry" in question
        or "expire soon" in question
        or "next 30 days" in question
    ):

        return {
            "type": "database",
            "category": "near_expiry",
            "data": get_near_expiry_medicines(db)
        }


    # ------------------------------------------------------
    # TODAY SALES
    # ------------------------------------------------------

    if (
        "today sales" in question
        or "today's sales" in question
        or "sales today" in question
        or "aaj ki sales" in question
    ):

        return {
            "type": "database",
            "category": "sales",
            "data": get_today_sales(db)
        }


    # ------------------------------------------------------
    # TOP SELLING
    # ------------------------------------------------------

    if (
        "top selling" in question
        or "most sold" in question
        or "best selling" in question
        or "sabse zyada" in question
    ):

        return {
            "type": "database",
            "category": "top_selling",
            "data": get_top_selling(db)
        }


    # ------------------------------------------------------
    # VENDOR
    # ------------------------------------------------------

    if (
        "vendor" in question
        or "supplier" in question
    ):

        medicines = find_medicines(
            db,
            message
        )

        if medicines:

            data = []

            for medicine in medicines:

                vendor = (
                    db.query(Vendor)
                    .filter(
                        Vendor.id
                        == medicine.vendor_id
                    )
                    .first()
                )

                data.append({
                    "medicine_name":
                        medicine.medicine_name,

                    "vendor":
                        vendor.vendor_name
                        if vendor
                        else None,

                    "contact_person":
                        vendor.contact_person
                        if vendor
                        else None,

                    "phone":
                        vendor.phone
                        if vendor
                        else None,

                    "email":
                        vendor.email
                        if vendor
                        else None,

                    "city":
                        vendor.city
                        if vendor
                        else None,
                })

            return {
                "type": "database",
                "category": "vendor",
                "data": data
            }

        return {
            "type": "database",
            "category": "vendors",
            "data": get_vendors(db)
        }


    # ------------------------------------------------------
    # CUSTOMER
    # ------------------------------------------------------

    if (
        "customer" in question
        or "customers" in question
        or "customer details" in question
    ):

        return {
            "type": "database",
            "category": "customers",
            "data": get_customers(db)
        }


    # ------------------------------------------------------
    # PURCHASE
    # ------------------------------------------------------

    if (
        "purchase" in question
        or "purchases" in question
        or "purchased" in question
    ):

        return {
            "type": "database",
            "category": "purchases",
            "data": get_purchases(db)
        }


    # ------------------------------------------------------
    # PRESCRIPTION
    # ------------------------------------------------------

    if (
        "prescription" in question
        or "prescriptions" in question
    ):

        return {
            "type": "database",
            "category": "prescriptions",
            "data": get_prescriptions(db)
        }


    # ------------------------------------------------------
    # MEDICINE STOCK / GENERAL MEDICINE INFORMATION
    # ------------------------------------------------------

    medicines = find_medicines(
        db,
        message
    )

    if medicines:

        return {
            "type": "database",
            "category": "medicine",
            "data": get_medicine_information(
                db,
                message
            )
        }


    return None