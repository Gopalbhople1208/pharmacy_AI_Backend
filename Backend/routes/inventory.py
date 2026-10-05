from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.pharmacy import Medicine, Inventory


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.get("/")
def get_inventory(
    db: Session = Depends(get_db)
):

    records = (
        db.query(Medicine, Inventory)
        .join(
            Inventory,
            Inventory.medicine_id == Medicine.id
        )
        .all()
    )

    result = []

    today = date.today()
    near_expiry_date = today + timedelta(days=30)

    for medicine, inventory in records:

        if medicine.expiry_date < today:
            status = "EXPIRED"

        elif medicine.expiry_date <= near_expiry_date:
            status = "NEAR EXPIRY"

        elif inventory.current_stock <= inventory.reorder_level:
            status = "LOW STOCK"

        else:
            status = "AVAILABLE"

        result.append({
            "medicine_id": medicine.id,
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "reorder_level": inventory.reorder_level,
            "expiry_date": medicine.expiry_date,
            "status": status
        })

    return {
        "total_medicines": len(result),
        "inventory": result
    }


@router.get("/low-stock")
def get_low_stock(
    db: Session = Depends(get_db)
):

    records = (
        db.query(Medicine, Inventory)
        .join(
            Inventory,
            Inventory.medicine_id == Medicine.id
        )
        .filter(
            Inventory.current_stock
            <= Inventory.reorder_level
        )
        .all()
    )

    return [
        {
            "medicine_id": medicine.id,
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "reorder_level": inventory.reorder_level
        }
        for medicine, inventory in records
    ]


@router.get("/expired")
def get_expired(
    db: Session = Depends(get_db)
):

    today = date.today()

    records = (
        db.query(Medicine, Inventory)
        .join(
            Inventory,
            Inventory.medicine_id == Medicine.id
        )
        .filter(
            Medicine.expiry_date < today
        )
        .all()
    )

    return [
        {
            "medicine_id": medicine.id,
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "expiry_date": medicine.expiry_date,
            "status": "EXPIRED"
        }
        for medicine, inventory in records
    ]


@router.get("/near-expiry")
def get_near_expiry(
    db: Session = Depends(get_db)
):

    today = date.today()
    near_expiry_date = today + timedelta(days=30)

    records = (
        db.query(Medicine, Inventory)
        .join(
            Inventory,
            Inventory.medicine_id == Medicine.id
        )
        .filter(
            Medicine.expiry_date >= today,
            Medicine.expiry_date <= near_expiry_date
        )
        .all()
    )

    return [
        {
            "medicine_id": medicine.id,
            "medicine_name": medicine.medicine_name,
            "current_stock": inventory.current_stock,
            "expiry_date": medicine.expiry_date,
            "status": "NEAR EXPIRY"
        }
        for medicine, inventory in records
    ]