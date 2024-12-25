import os, json

def generate_json(folder):
    data = []
    prefix = "movies_and_tv_series_Software_"
    files = sorted(f for f in os.listdir(folder) if f.endswith((".png",".jpg",".jpeg",".PNG",".JPG",".JPEG")) and f.startswith(prefix))
    for idx, f in enumerate(files):
        name = f.replace(prefix, "").rsplit(".",1)[0]
        data.append({
            "id": idx,
            "name": name,
            "loc": f"/Images/Projects/Project_Movies_and_TV_Series_Software/{f}",
            "thumb": f"/Images/Projects/Project_Movies_and_TV_Series_Software/{f}"
        })
    with open(os.path.join(folder, "images.json"), "w") as j:
        json.dump(data, j, indent=2)

if __name__ == "__main__":
    generate_json("./")  # or specify your folder path here