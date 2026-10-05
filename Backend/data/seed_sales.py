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
    Customer,
    Medicine,
    Sale,
    SaleItem
)


db = SessionLocal()


# --------------------------------------------------
# Configuration
# --------------------------------------------------

NUMBER_OF_SALES = 2000


# --------------------------------------------------
# Load existing data
# --------------------------------------------------

customers = db.query(Customer).all()
medicines = db.query(Medicine).all()


if not customers:
    print("ERROR: No customers found.")
    print("Run seed_data.py first.")
    db.close()
    raise SystemExit()


if not medicines:
    print("ERROR: No medicines found.")
    print("Run seed_data.py first.")
    db.close()
    raise SystemExit()


print(f"Found {len(customers)} customers.")
print(f"Found {len(medicines)} medicines.")


# --------------------------------------------------
# Create Sales
# --------------------------------------------------

print("\nCreating sales transactions...")


for i in range(NUMBER_OF_SALES):

    customer = random.choice(customers)

    sale_date = (
        date.today()
        - timedelta(days=random.randint(0, 365))
    )

    discount = round(
        random.uniform(0, 100),
        2
    )

    sale = Sale(
        customer_id=customer.id,
        sale_date=sale_date,
        discount=discount,
        total_amount=0,
        payment_status=random.choice([
            "Paid",
            "Paid",
            "Paid",
            "Pending"
        ])
    )

    db.add(sale)
    db.flush()

    subtotal = 0

    # Each sale contains 1–5 medicines
    selected_medicines = random.sample(
        medicines,
        random.randint(1, 5)
    )

    for medicine in selected_medicines:

        quantity = random.randint(1, 10)

        selling_price = medicine.selling_price

        total_amount = round(
            quantity * selling_price,
            2
        )

        sale_item = SaleItem(
            sale_id=sale.id,
            medicine_id=medicine.id,
            quantity=quantity,
            selling_price=selling_price,
            total_amount=total_amount
        )

        db.add(sale_item)

        subtotal += total_amount

    # Apply discount
    final_amount = max(
        subtotal - discount,
        0
    )

    sale.total_amount = round(
        final_amount,
        2
    )

    # Commit every 100 sales
    if (i + 1) % 100 == 0:

        db.commit()

        print(
            f"{i + 1} sales transactions created..."
        )


# --------------------------------------------------
# Final Commit
# --------------------------------------------------

db.commit()
db.close()


print("\n---------------------------------------")
print("SALES DATA CREATION COMPLETED")
print("---------------------------------------")
print(f"Sales created: {NUMBER_OF_SALES}")
print("---------------------------------------")