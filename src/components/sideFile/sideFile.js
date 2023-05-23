import * as emulateTab from "https://cdn.skypack.dev/emulate-tab@1.2.1";

class Tree {

  render() {
    const q = [[this.data, this.container]];

    while (q.length > 0) {
      const [front, parent] = q.pop();

      const wrapper = document.createElement("li");
      wrapper.classList.add("wrapper");
      wrapper.setAttribute("role", "treeitem");
      wrapper.setAttribute("aria-expanded", "false");
      wrapper.setAttribute("aria-selected", "false");

      const header = document.createElement("span");

      header.setAttribute("tabindex", 0);
      header.dataset.type = front.type;
      header.classList.add("header");
      const pathElements = front.path.split("/");
      header.textContent = pathElements[pathElements.length - 1] || "/";
      const list = document.createElement("ul");
      list.classList.add("hidden");
      list.setAttribute("role", "group");

      const handleClick = () => {
        list.classList.toggle("hidden");

        if (list.classList.contains("hidden")) {
          header.classList.remove("isOpen");
        } else {
          header.classList.add("isOpen");
        }
      };

      header.addEventListener("click", handleClick);

      header.addEventListener("keydown", (event) => {
        event.stopPropagation();
        if (event.code === "Enter" || event.code === " ") {
          handleClick();
        } else if (event.code === "ArrowDown") {
          emulateTab.emulateTab();
        } else if (event.code === "ArrowUp") {
          emulateTab.emulateTab.backwards();
        }
      });

      wrapper.appendChild(header);
      wrapper.appendChild(list);

      if (front.type === "dir" && front.children.length > 0) {
        front.children.forEach((child) => q.push([child, list]));
      }

      parent.appendChild(wrapper);
    }
  }

  mount(root) {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
    <div class="tree-container" role="section">
    <h1 class="title" id="tree-header">${this.title}</h1>
    <ul class="tree-root" role="tree" aria-labeledby="tree-header"><ul>
    </div>`;

    this.container = wrapper.querySelector(".tree-root");

    this.render();
    root.appendChild(wrapper);
  }
}

const data = {
  path: "/",
  type: "dir",
  children: [
    {
      path: "/documents",
      type: "dir",
      children: [
        {
          path: "/documents/report.docx",
          type: "file"
        },
        {
          path: "/documents/presentation.pptx",
          type: "file"
        },
        {
          path: "/documents/notes.txt",
          type: "file"
        }
      ]
    },
    {
      path: "/photos",
      type: "dir",
      children: [
        {
          path: "/photos/summer",
          type: "dir",
          children: [
            {
              path: "/photos/summer/beach.jpg",
              type: "file"
            },
            {
              path: "/photos/summer/pool.jpg",
              type: "file"
            }
          ]
        },
        {
          path: "/photos/winter",
          type: "dir",
          children: [
            {
              path: "/photos/winter/snow.jpg",
              type: "file"
            },
            {
              path: "/photos/winter/ski.jpg",
              type: "file"
            }
          ]
        }
      ]
    },
    {
      path: "/music",
      type: "dir",
      children: [
        {
          path: "/music/rock",
          type: "dir",
          children: [
            {
              path: "/music/rock/acdc.mp3",
              type: "file"
            },
            {
              path: "/music/rock/guns.mp3",
              type: "file"
            }
          ]
        },
        {
          path: "/music/classical",
          type: "dir",
          children: [
            {
              path: "/music/classical/beethoven.mp3",
              type: "file"
            },
            {
              path: "/music/classical/mozart.mp3",
              type: "file"
            }
          ]
        }
      ]
    }
  ]
};

export default Tree
