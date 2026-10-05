import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

import random
from datetime import date, timedelta

from database import SessionLocal
from models.pharmacy import (
    Vendor,
    Medicine,
    Purchase,
    PurchaseItem
)


db = SessionLocal()


# --------------------------------------------------
# Configuration
# --------------------------------------------------

NUMBER_OF_PURCHASES = 1000


# --------------------------------------------------
# Load existing data
# --------------------------------------------------

vendors = db.query(Vendor).all()
medicines = db.query(Medicine).all()


if not vendors:
    print("ERROR: No vendors found.")
    print("Run seed_data.py first.")
    db.close()
    raise SystemExit()


if not medicines:
    print("ERROR: No medicines found.")
    print("Run seed_data.py first.")
    db.close()
    raise SystemExit()


print(f"Found {len(vendors)} vendors.")
print(f"Found {len(medicines)} medicines.")


# --------------------------------------------------
# Create Purchases
# --------------------------------------------------

print("\nCreating purchase transactions...")


for i in range(NUMBER_OF_PURCHASES):

    vendor = random.choice(vendors)

    # Random purchase date within approximately
    # the last 12 months
    purchase_date = (
        date.today()
        - timedelta(days=random.randint(0, 365))
    )

    purchase = Purchase(
        vendor_id=vendor.id,
        purchase_date=purchase_date,
        total_amount=0
    )

    db.add(purchase)
    db.flush()

    total_purchase_amount = 0

    # Each purchase contains 1–5 medicines
    selected_medicines = random.sample(
        medicines,
        random.randint(1, 5)
    )

    for medicine in selected_medicines:

        quantity = random.randint(10, 200)

        purchase_price = medicine.purchase_price

        # Generate a new dummy batch
        batch_number = (
            f"BATCH-{random.randint(100000, 999999)}"
        )

        expiry_date = (
            date.today()
            + timedelta(days=random.randint(90, 900))
        )

        total_amount = round(
            quantity * purchase_price,
            2
        )

        purchase_item = PurchaseItem(
            purchase_id=purchase.id,
            medicine_id=medicine.id,
            quantity=quantity,
            purchase_price=purchase_price,
            batch_number=batch_number,
            expiry_date=expiry_date,
            total_amount=total_amount
        )

        db.add(purchase_item)

        total_purchase_amount += total_amount

    purchase.total_amount = round(
        total_purchase_amount,
        2
    )


    # Commit every 100 purchases
    if (i + 1) % 100 == 0:

        db.commit()

        print(
            f"{i + 1} purchase transactions created..."
        )


# --------------------------------------------------
# Final Commit
# --------------------------------------------------

db.commit()
db.close()


print("\n---------------------------------------")
print("PURCHASE DATA CREATION COMPLETED")
print("---------------------------------------")
print(f"Purchases created: {NUMBER_OF_PURCHASES}")
print("---------------------------------------")