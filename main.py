import os
import json
import cloudinary
import cloudinary.uploader

# ==============================
# 🔐 Cloudinary Config
# ==============================
cloudinary.config(
    cloud_name="dcnbcl3id",
    api_key="981673235541113",
    api_secret="RyrPGVwmdCzdD7bWgmtLtQaXbjY"
)

# ==============================
# 📁 PATH CONFIG
# ==============================
BASE_PATH = r"C:\Users\Ketan\Desktop\Nova\DJS-NOVA-2025-26\public"
JSON_PATH = r"C:\Users\Ketan\Desktop\Nova\DJS-NOVA-2025-26\public\eventdata.json"  # change if needed

# ==============================
# 🔧 HELPERS
# ==============================

def get_full_path(relative_path):
    if not relative_path:
        return None

    # Remove leading slash
    if relative_path.startswith("/"):
        relative_path = relative_path[1:]

    full_path = os.path.join(BASE_PATH, relative_path)
    return full_path


def upload_image(file_path):
    try:
        if not os.path.exists(file_path):
            print(f"❌ File not found: {file_path}")
            return None

        # Keep folder structure in Cloudinary
        public_id = file_path.split("public\\")[-1].replace("\\", "/")

        response = cloudinary.uploader.upload(
            file_path,
            public_id=public_id,
            resource_type="image"
        )

        print(f"✅ Uploaded: {file_path}")
        return response["secure_url"]

    except Exception as e:
        print(f"❌ Error uploading {file_path}: {e}")
        return None


# ==============================
# 📥 LOAD JSON
# ==============================
with open(JSON_PATH, "r") as f:
    events = json.load(f)

print(f"\n🚀 Loaded {len(events)} events\n")


# ==============================
# 🔄 PROCESS EVENTS
# ==============================
for event in events:
    print(f"\n📌 Processing: {event['title']}")

    # --------------------------
    # Cover Image
    # --------------------------
    if "coverImage" in event:
        full_path = get_full_path(event["coverImage"])

        print(f"➡️ Cover: {full_path}")

        url = upload_image(full_path)
        if url:
            event["coverImage"] = url

    # --------------------------
    # Gallery Images
    # --------------------------
    if "gallery" in event and isinstance(event["gallery"], list):
        for img in event["gallery"]:
            full_path = get_full_path(img.get("url"))

            print(f"➡️ Gallery: {full_path}")

            url = upload_image(full_path)
            if url:
                img["url"] = url


# ==============================
# 💾 SAVE UPDATED JSON
# ==============================
OUTPUT_PATH = "updated_events.json"

with open(OUTPUT_PATH, "w") as f:
    json.dump(events, f, indent=2)

print("\n🎉 DONE! Uploaded all images")
print(f"📄 Saved updated JSON → {OUTPUT_PATH}")