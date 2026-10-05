from datetime import date, timedelta

from sqlalchemy.orm import Session

from models.pharmacy import (
    Medicine,
    Inventory,
    PurchaseItem,
    SaleItem
)


NEAR_EXPIRY_DAYS = 30


def calculate_inventory(db: Session):
    medicines = db.query(Medicine).all()

    updated_count = 0

    for medicine in medicines:

        # Total purchased quantity
        purchased = (
            db.query(PurchaseItem)
            .filter(
                PurchaseItem.medicine_id == medicine.id
            )
            .all()
        )

        total_purchased = sum(
            item.quantity for item in purchased
        )

        # Total sold quantity
        sold = (
            db.query(SaleItem)
            .filter(
                SaleItem.medicine_id == medicine.id
            )
            .all()
        )

        total_sold = sum(
            item.quantity for item in sold
        )

        # Existing initial stock
        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.medicine_id == medicine.id
            )
            .first()
        )

        if not inventory:
            inventory = Inventory(
                medicine_id=medicine.id,
                current_stock=0,
                reorder_level=medicine.reorder_level
            )

            db.add(inventory)

        # Keep the initial stock that was created
        # by seed_data.py.
        initial_stock = inventory.current_stock

        # Calculate final stock
        current_stock = (
            initial_stock
            + total_purchased
            - total_sold
        )

        # Prevent negative stock
        current_stock = max(current_stock, 0)

        inventory.current_stock = current_stock
        inventory.reorder_level = medicine.reorder_level

        updated_count += 1

    db.commit()

    return updated_count


def get_inventory_status(medicine: Medicine, inventory: Inventory):

    today = date.today()

    if medicine.expiry_date < today:
        return "EXPIRED"

    if medicine.expiry_date <= (
        today + timedelta(days=NEAR_EXPIRY_DAYS)
    ):
        return "NEAR EXPIRY"

    if inventory.current_stock <= inventory.reorder_level:
        return "LOW STOCK"

    return "AVAILABLE"