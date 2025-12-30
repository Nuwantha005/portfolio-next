import os, json

def generate_json(folder):
    data = []
    prefix = ""
    files = sorted(f for f in os.listdir(folder) if f.endswith((".png",".jpg",".jpeg",".PNG",".JPG",".JPEG")) and f.startswith(prefix))
    for idx, f in enumerate(files):
        name = f.replace(prefix, "").rsplit(".",1)[0]
        data.append({
            "id": idx,
            "name": name,
            "loc": f"/projects/project_communication_software/images/{f}",
            "thumb": f"/projects/project_communication_software/images/{f}"
        })
    with open(os.path.join(folder, "images.json"), "w") as j:
        json.dump(data, j, indent=2)

if __name__ == "__main__":
    generate_json("./")  # or specify your folder path here