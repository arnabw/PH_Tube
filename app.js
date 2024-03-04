// Button Functionality
let sorted = false;
const loadButtonData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  buttonInsert(data.data);
};

function buttonInsert(btns) {
  const allBtn = document.getElementById("allBtn");
  btns.forEach((btn) => {
    const button = document.createElement("button");
    button.className =
      "btnSelected py-2 px-5 bg-[#25252526] rounded-lg text-[#252525B2] font-medium";
    button.addEventListener("click", () => {
      document.querySelectorAll(".btnSelected").forEach((btn) => {
        btn.classList.replace("bg-[#FF1F3D]", "bg-[#25252526]");
        btn.classList.replace("text-white", "text-[#252525B2]");
      });
      button.classList.replace("text-[#252525B2]", "text-white");
      button.classList.replace("bg-[#25252526]", "bg-[#FF1F3D]");
      loadData(btn.category_id);
    });
    button.innerText = btn.category;

    allBtn.appendChild(button);
  });
}

function sortByView() {
  sorted = true;
  loadData();
}

//Showcase Functionality
const loadData = async (id = 1000) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  dataInsert(data.data);
};

function dataInsert(allData) {
  const display = document.getElementById("allData");

  display.innerHTML = "";
  if (allData.length === 0) {
    display.innerHTML = `
    <div
    class="flex flex-col justify-center items-center space-y-4 text-center col-span-1 md:col-span-3 lg:col-span-4 mt-6"
  >
    <img src="./Icon.png" alt="" />
    <p class="text-[#100F0F] text-xl md:text-3xl lg:text-5xl font-bold">
      Oops!! Sorry, There is no <br />
      content here
    </p>
  </div>
    `;
  }
  if (sorted) {
    allData.sort((a, b) => {
      const firstElement = a.others.views.replace("K", "");
      const secondElement = b.others.views.replace("K", "");
      return secondElement - firstElement;
    });
  }
  allData.forEach((data) => {
    const article = document.createElement("article");
    article.className = "space-y-5";
    article.innerHTML = `
    <div>
    <img
      class="object-cover w-full rounded-lg h-[200px]"
      src="${data.thumbnail}"
      alt=""
    />
  </div>
  <div class="flex gap-3">
    <img
      class="object-cover size-10 rounded-full"
      src="${data.authors[0].profile_picture}"
      alt=""
    />
    <ul class="space-y-1">
      <li class="font-bold text-[#171717]">
        ${data.title}
      </li>
      <li
        class="flex gap-2 items-center text-[#171717B2] text-sm font-medium"
      >
        ${data.authors[0].profile_name} ${
      data.authors[0].verified
        ? '<img class="size-5" src="./verified.png" alt="" />'
        : ""
    }
      </li>
      <li class="text-[#171717B2] text-sm font-medium">
        <span>${data.others.views}</span> views
      </li>
    </ul>
  </div>
    `;

    display.appendChild(article);
  });
}

loadData();
loadButtonData();
