import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

from database import SessionLocal
from services.inventory_service import calculate_inventory


db = SessionLocal()

try:

    print("Calculating inventory...")

    updated = calculate_inventory(db)

    print("---------------------------------------")
    print("INVENTORY CALCULATION COMPLETED")
    print("---------------------------------------")
    print(f"Medicines updated: {updated}")
    print("---------------------------------------")

finally:

    db.close()