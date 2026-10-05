import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)


import random
from datetime import date, timedelta

from faker import Faker

from database import SessionLocal
from models.pharmacy import (
    Vendor,
    Medicine,
    Customer,
    Inventory
)

fake = Faker("en_IN")

db = SessionLocal()


# --------------------------------------------------
# Dummy Data Configuration
# --------------------------------------------------

NUMBER_OF_MEDICINES = 1000
NUMBER_OF_VENDORS = 100
NUMBER_OF_CUSTOMERS = 200


# --------------------------------------------------
# Pharmacy Data
# --------------------------------------------------

medicine_names = [
    "Paracetamol",
    "Amoxicillin",
    "Azithromycin",
    "Cetirizine",
    "Ibuprofen",
    "Metformin",
    "Pantoprazole",
    "Omeprazole",
    "Amlodipine",
    "Atorvastatin",
    "Losartan",
    "Levocetirizine",
    "Diclofenac",
    "Doxycycline",
    "Ciprofloxacin",
    "Montelukast",
    "Rabeprazole",
    "Domperidone",
    "Ondansetron",
    "Vitamin B Complex",
    "Calcium",
    "Vitamin D3",
    "Iron Supplement",
    "ORS",
    "Antacid"
]

generic_names = [
    "Paracetamol",
    "Amoxicillin",
    "Azithromycin",
    "Cetirizine",
    "Ibuprofen",
    "Metformin",
    "Pantoprazole",
    "Omeprazole",
    "Amlodipine",
    "Atorvastatin",
    "Losartan",
    "Levocetirizine",
    "Diclofenac",
    "Doxycycline",
    "Ciprofloxacin",
    "Montelukast",
    "Rabeprazole",
    "Domperidone",
    "Ondansetron",
    "Multivitamin",
    "Calcium Carbonate",
    "Cholecalciferol",
    "Ferrous Sulfate",
    "Oral Rehydration Salts",
    "Aluminium Hydroxide"
]

categories = [
    "Analgesic",
    "Antibiotic",
    "Antacid",
    "Antihistamine",
    "Diabetes",
    "Cardiovascular",
    "Vitamin",
    "Gastrointestinal",
    "Pain Relief",
    "Respiratory"
]

dosage_forms = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Cream",
    "Ointment",
    "Drops"
]

strengths = [
    "100 mg",
    "250 mg",
    "500 mg",
    "650 mg",
    "10 mg",
    "20 mg",
    "40 mg",
    "50 mg",
    "1000 mg"
]

manufacturers = [
    "PharmaCare Labs",
    "HealthPlus Pharma",
    "MediLife Healthcare",
    "Nova Pharmaceuticals",
    "WellCare Labs",
    "CureMed Pharma",
    "LifePoint Healthcare",
    "MediTrust Labs",
    "PrimeCare Pharma",
    "HealthFirst Pharmaceuticals"
]


# --------------------------------------------------
# Create Vendors
# --------------------------------------------------

print("Creating vendors...")

vendors = []

for i in range(NUMBER_OF_VENDORS):

    vendor = Vendor(
        vendor_name=f"{fake.company()} Pharma",
        contact_person=fake.name(),
        phone=fake.numerify("9#########"),
        email=fake.company_email(),
        address=fake.address().replace("\n", ", "),
        city=fake.city(),
        gst_number=f"GST{random.randint(100000000, 999999999)}",
        status="Active"
    )

    db.add(vendor)
    vendors.append(vendor)

db.commit()

print(f"{NUMBER_OF_VENDORS} vendors created.")


# --------------------------------------------------
# Create Medicines
# --------------------------------------------------

print("Creating medicines...")

medicines = []

for i in range(NUMBER_OF_MEDICINES):

    base_name = random.choice(medicine_names)
    generic = random.choice(generic_names)

    purchase_price = round(
        random.uniform(10, 500),
        2
    )

    selling_price = round(
        purchase_price * random.uniform(1.10, 1.40),
        2
    )

    mrp = round(
        selling_price * random.uniform(1.05, 1.15),
        2
    )

    expiry_date = date.today() + timedelta(
        days=random.randint(90, 1000)
    )

    medicine = Medicine(
        medicine_name=f"{base_name} {random.choice(strengths)} {i + 1}",
        generic_name=generic,
        brand_name=f"{base_name}Care",
        category=random.choice(categories),
        dosage_form=random.choice(dosage_forms),
        strength=random.choice(strengths),
        manufacturer=random.choice(manufacturers),
        batch_number=f"BATCH{random.randint(100000, 999999)}",
        expiry_date=expiry_date,
        mrp=mrp,
        purchase_price=purchase_price,
        selling_price=selling_price,
        reorder_level=random.randint(10, 50),
        vendor_id=random.choice(vendors).id
    )

    db.add(medicine)
    medicines.append(medicine)

db.commit()

print(f"{NUMBER_OF_MEDICINES} medicines created.")


# --------------------------------------------------
# Create Customers
# --------------------------------------------------

print("Creating customers...")

customers = []

for i in range(NUMBER_OF_CUSTOMERS):

    customer = Customer(
        customer_name=fake.name(),
        phone=fake.numerify("9#########"),
        email=fake.email(),
        address=fake.address().replace("\n", ", "),
        city=fake.city()
    )

    db.add(customer)
    customers.append(customer)

db.commit()

print(f"{NUMBER_OF_CUSTOMERS} customers created.")


# --------------------------------------------------
# Create Inventory
# --------------------------------------------------

print("Creating inventory...")

for medicine in medicines:

    stock = random.randint(5, 300)

    inventory = Inventory(
        medicine_id=medicine.id,
        current_stock=stock,
        reorder_level=medicine.reorder_level
    )

    db.add(inventory)

db.commit()

print(f"{NUMBER_OF_MEDICINES} inventory records created.")


# --------------------------------------------------
# Finish
# --------------------------------------------------

db.close()

print("\n---------------------------------------")
print("DUMMY DATA CREATION COMPLETED")
print("---------------------------------------")
print(f"Medicines : {NUMBER_OF_MEDICINES}")
print(f"Vendors   : {NUMBER_OF_VENDORS}")
print(f"Customers : {NUMBER_OF_CUSTOMERS}")
print(f"Inventory : {NUMBER_OF_MEDICINES}")
print("---------------------------------------")