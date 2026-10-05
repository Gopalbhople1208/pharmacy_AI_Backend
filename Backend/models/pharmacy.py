from datetime import date, datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
    ForeignKey,
    Text,
    Boolean
)

from sqlalchemy.orm import relationship


from database import Base


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String(150), nullable=False)
    contact_person = Column(String(100))
    phone = Column(String(20))
    email = Column(String(150))
    address = Column(String(250))
    city = Column(String(100))
    gst_number = Column(String(50))
    status = Column(String(20), default="Active")

    medicines = relationship("Medicine", back_populates="vendor")
    purchases = relationship("Purchase", back_populates="vendor")


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)

    medicine_name = Column(String(150), nullable=False)
    generic_name = Column(String(150))
    brand_name = Column(String(150))
    category = Column(String(100))
    dosage_form = Column(String(50))
    strength = Column(String(50))
    manufacturer = Column(String(150))

    batch_number = Column(String(100))
    expiry_date = Column(Date)

    mrp = Column(Float)
    purchase_price = Column(Float)
    selling_price = Column(Float)

    reorder_level = Column(Integer, default=10)

    vendor_id = Column(Integer, ForeignKey("vendors.id"))

    vendor = relationship("Vendor", back_populates="medicines")
    inventory = relationship(
        "Inventory",
        back_populates="medicine",
        uselist=False
    )


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String(150), nullable=False)
    phone = Column(String(20))
    email = Column(String(150))
    address = Column(String(250))
    city = Column(String(100))

    created_at = Column(DateTime, default=datetime.utcnow)

    sales = relationship("Sale", back_populates="customer")
    prescriptions = relationship(
        "Prescription",
        back_populates="customer"
    )


class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(Integer, ForeignKey("vendors.id"))

    purchase_date = Column(Date, default=date.today)
    total_amount = Column(Float, default=0)

    vendor = relationship("Vendor", back_populates="purchases")
    items = relationship(
        "PurchaseItem",
        back_populates="purchase"
    )


class PurchaseItem(Base):
    __tablename__ = "purchase_items"

    id = Column(Integer, primary_key=True, index=True)

    purchase_id = Column(
        Integer,
        ForeignKey("purchases.id")
    )

    medicine_id = Column(
        Integer,
        ForeignKey("medicines.id")
    )

    quantity = Column(Integer, nullable=False)
    purchase_price = Column(Float)
    batch_number = Column(String(100))
    expiry_date = Column(Date)
    total_amount = Column(Float)

    purchase = relationship(
        "Purchase",
        back_populates="items"
    )


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    sale_date = Column(Date, default=date.today)
    discount = Column(Float, default=0)
    total_amount = Column(Float, default=0)
    payment_status = Column(
        String(30),
        default="Paid"
    )

    customer = relationship(
        "Customer",
        back_populates="sales"
    )

    items = relationship(
        "SaleItem",
        back_populates="sale"
    )


class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)

    sale_id = Column(
        Integer,
        ForeignKey("sales.id")
    )

    medicine_id = Column(
        Integer,
        ForeignKey("medicines.id")
    )

    quantity = Column(Integer, nullable=False)
    selling_price = Column(Float)
    total_amount = Column(Float)

    sale = relationship(
        "Sale",
        back_populates="items"
    )


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)

    medicine_id = Column(
        Integer,
        ForeignKey("medicines.id"),
        unique=True
    )

    current_stock = Column(Integer, default=0)
    reorder_level = Column(Integer, default=10)

    medicine = relationship(
        "Medicine",
        back_populates="inventory"
    )


class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    prescription_number = Column(String(100))
    prescription_date = Column(Date)
    doctor_name = Column(String(150))
    notes = Column(Text)

    customer = relationship(
        "Customer",
        back_populates="prescriptions"
    )


class AIQuery(Base):
    __tablename__ = "ai_queries"

    id = Column(Integer, primary_key=True, index=True)

    user_query = Column(Text, nullable=False)
    ai_response = Column(Text)

    provider = Column(String(50))
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    success = Column(Boolean, default=True)