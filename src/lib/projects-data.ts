export interface Project {
  image: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  featured?: boolean;
  year?: number;
  duration?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  priority: number; // Lower number = shows first
  projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
  {
    id: "industrial-training",
    name: "Industrial Training",
    description: "Projects completed during my industrial training period",
    priority: 1,
    projects: [
      {
        image: "./Images/Projects/Volute_Fillet_Thumbnail.jpeg",
        name: "Parametric Volute Tongue Fillet",
        description:
          "Developed a parametric fillet generation algorithm for volute tongue geometry in centrifugal turbomachinery using Coons patches with tangency constraints, integrated into a commercial CAD suite.",
        tags: ["C++", "OpenCascade", "CAD", "Qt"],
        link: "projects/project_volute_fillet",
        year: 2025,
        duration: "3 months",
      },
      {
        image: "./Images/Projects/Constrained_Solver_Thumbnail.jpeg",
        name: "Constrained Parametric Curve Solver",
        description:
          "A linear algebra-based solver for repositioning B-Spline and Bézier control points while maintaining geometric tangency constraints in real time. Published at MERS 2025 and won Best Poster Award.",
        tags: ["C++", "Python", "Linear Algebra", "NLopt"],
        link: "projects/project_constrained_solver",
        featured: true,
        year: 2025,
        duration: "2 months",
      },
      {
        image: "./Images/Projects/Meridional_Solver_Thumbnail.jpeg",
        name: "Meridional Flow Solver",
        description:
          "A rapid quasi-3D flow solver for preliminary turbomachinery design, estimating velocity, pressure and temperature distributions along the meridional plane with sub-second solve times.",
        tags: ["C++", "Python", "NumPy", "Qt", "Multi-threading"],
        link: "projects/project_meridional_solver",
        year: 2025,
        duration: "2 months",
      },
    ],
  },
  {
    id: "academic",
    name: "Academic Projects",
    description: "Projects from university coursework and research",
    priority: 2,
    projects: [
      {
        image: "./Images/Projects/MEMS_TEC_Thumbnail.jpeg",
        name: "MEMS Radial Thermoelectric Cooler",
        description:
          "Designed a radial thermoelectric cooler for hotspot management in 3D stacked chips. Built a compact thermal model (resistor network → linear system) in MATLAB, optimized geometry via grid search and NSGA-II, and validated with coupled multiphysics COMSOL simulations driven through SolidWorks LiveLink and MATLAB API.",
        tags: ["MATLAB", "COMSOL", "SolidWorks", "MEMS", "Optimization"],
        link: "projects/project_mems_tec",
        featured: true,
        year: 2024,
        duration: "4 months",
      },
      {
        image: "./Images/Projects/CFD_Microchannel_Thumbnail.jpeg",
        name: "CFD Study on Micro Channel Heat Sink",
        description:
          "Numerical study on heat transfer and fluid flow in a micro channel with circular ribs using ANSYS Fluent. Simulated 9 Reynolds numbers with conjugate heat transfer, validated against literature, and built unified contour plots in Matplotlib from exported Fluent data.",
        tags: ["ANSYS Fluent", "CFD", "SolidWorks", "Python", "Matplotlib"],
        link: "projects/project_cfd_microchannel",
        year: 2024,
        duration: "3 months",
      },
      {
        image: "./Images/Projects/Gearbox_Design_Thumbnail.jpeg",
        name: "Gearbox Design for a Spacer Cart",
        description:
          "Group project designing a 3-speed forward + 3-speed reverse gearbox. My contributions: brute-force search in Python to find feasible gear tooth/module combinations, shaft bending moment analysis with Python-generated BMD plots, gear safety calculations (Lewis, Buckingham, wear), bearing selection, and full shifting mechanism geometry design with ball-and-socket joint.",
        tags: ["Machine Design", "Python", "SolidWorks", "Gearbox"],
        link: "projects/project_gearbox_design",
        year: 2024,
        duration: "4 months",
      },
      {
        image: "./Images/Projects/Reverse_Engineering_Project.png",
        name: "Reverse Engineering of a Water Dispensor",
        description:
          "A commercial water dispensor was disassembled, materials were identified, measurements were taken and modeled in SolidWorks. Furthermore possible manufacturing methods were proposed and solidworks fill and pack simulation was done to check the feasibility of injection moulding.",
        tags: ["CAD", "SolidWorks"],
        link: "",
        year: 2023,
      },
      {
        image: "./Images/Projects/Mechatronics_Project_Thumbnail.png",
        name: "Automatic Book Stacker",
        description:
          "A system that can be used to store books in a bookshelf and retrieve them automatically. System is operated using Arduino and motor drivers and robot gripper is used for actuation.",
        tags: ["CAD", "Arduino", "AutoCAD", "SolidWorks"],
        link: "",
        year: 2023,
      },
      {
        image: "./Images/Projects/Single_DOF_MATLAB.png",
        name: "Single DOF Vibration Simulation",
        description:
          "Behaviour of a damped mass under different conditions were simulated in MATLAB. Later an interactive web application was built using p5js and react that allows real time adjustments to the system.",
        tags: ["MATLAB", "P5js", "React", "CSS", "Live Demo", "Visualization"],
        link: "projects/project_single_dof_vibration",
        featured: true,
        year: 2023,
      },
    ],
  },
  {
    id: "personal",
    name: "Personal Projects",
    description: "Self-initiated projects and experiments",
    priority: 3,
    projects: [
      {
        image: "./Images/Projects/Communication_SOftware_HomePage.PNG",
        name: "Communication Software",
        description:
          "This a MySQL database linked data management system to manage inventory, sales and all the details of a communication business. Entire Programme was implemented using Java and features such as chart generation, printing reports, data backup and QR, Barcode generation were implemented.",
        tags: ["Java", "MySQL"],
        link: "projects/Project_CommunicationSoftware",
        featured: true,
        year: 2022,
      },
      {
        image: "./Images/Projects/movies_and_tv_series_Software_Window.PNG",
        name: "Movies and Series Management Software",
        description:
          "A software application to store details of movies that is built using JavaFX that stores data on a MySQL database. UI was designed using Scenebuilder, and styles were added using CSS.",
        tags: ["JavaFX", "MySQL", "CSS"],
        link: "projects/Project_MoviesSoftware",
        year: 2022,
      },
      {
        image: "./Images/Projects/Fourier_Image_Example.png",
        name: "Turning Images into Fourier Sums and Drawing",
        description:
          "This program takes an input image, extracts its contours using OpenCV, and turns the contours to fourier sums using the DFT algorithm. Then they can be drawn using two sets of rotating circles that represent two fourier sums.",
        tags: ["Processing", "OpenCV", "Visualization"],
        link: "https://github.com/Nuwantha005/turning_images_to_fourier_sums_and_drawing_them",
        year: 2022,
      },
      {
        image: "./Images/Projects/Complex_Mapping.png",
        name: "Complex Transformations Mapping",
        description:
          "Several programs with different styles were created to animate transformations done by any complex functions. They were animated using Cartesian and Polar coordinate systems, and two methods, points and lines on the plane were used to visualize the transformation.",
        tags: ["Processing", "Visualization"],
        link: "projects/project_complex_mapping",
        year: 2022,
      },
      {
        image: "./Images/Projects/TSP_Bruteforce_Genetic_Comparison.png",
        name: "Travelling Salesman Problem Visualization",
        description:
          "The traveling salesman problem is a popular problem in computer science that deals with finding the shortest path for a given set of points. This program uses two methods: brute force and genetic algorithm to solve this problem, and the processes happening can be seen side by side.",
        tags: ["Processing", "Visualization"],
        link: "https://github.com/Nuwantha005/TSP_BruteForce_and_Genetic_Comparison",
        year: 2021,
      },
      {
        image: "./Images/Projects/Fourier_Names_React.png",
        name: "Turning Text into Fourier Sums and Drawing",
        description:
          "This program is an extension for another program by me that turns images into fourier sums and visualizes them. This program can convert a given string into an image, extract its counters, apply a discrete Fourier transform, and draw it using circles.",
        tags: ["Processing", "Visualization"],
        link: "https://github.com/Nuwantha005/drawing_texts_using_fourier_series",
        year: 2021,
      },
    ],
  },
];

// Helper function to get all projects flattened (for backward compatibility)
export function getAllProjects(): Project[] {
  return projectCategories
    .sort((a, b) => a.priority - b.priority)
    .flatMap((category) => category.projects);
}

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

// Helper function to get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Helper function to get projects by category
export function getProjectsByCategory(categoryId: string): Project[] {
  const category = projectCategories.find((c) => c.id === categoryId);
  return category?.projects ?? [];
}
