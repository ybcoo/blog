import { getArticle } from "~~/util/api";
export const homeHooks = () => {
  const pageNum = ref(1);
  const pageSize = ref(5);
  const total = ref(0);
  const totalPage = ref(0);
  const pageList = ref([
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "Exploring Nuxt.js for Modern Web Apps",
      date: "2024-01-15",
      content:
        "In this project, I built a modern web application using Nuxt.js. It was exciting to work with server-side rendering and static site generation.",
    },
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "Exploring Nuxt.js for Modern Web Apps",
      date: "2024-01-15",
      content:
        "In this project, I built a modern web application using Nuxt.js. It was exciting to work with server-side rendering and static site generation.",
    },
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "Exploring Nuxt.js for Modern Web Apps",
      date: "2024-01-15",
      content:
        "In this project, I built a modern web application using Nuxt.js. It was exciting to work with server-side rendering and static site generation.",
    },
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "Exploring Nuxt.js for Modern Web Apps",
      date: "2024-01-15",
      content:
        "In this project, I built a modern web application using Nuxt.js. It was exciting to work with server-side rendering and static site generation.",
    },
    {
      title: "My First Webpage Project",
      date: "2023-08-01",
      content:
        "This is my first webpage project using HTML, CSS, and JavaScript. I learned a lot about web development and had fun creating it!",
    },
    {
      title: "Exploring Nuxt.js for Modern Web Apps",
      date: "2024-01-15",
      content:
        "In this project, I built a modern web application using Nuxt.js. It was exciting to work with server-side rendering and static site generation.",
    },
  ]);
  const textList = ref([]);
  let moreLines = ref([]);
  const setLoopList = async () => {
    try {
      const { data, error } = await getArticle({
        pageNum: 1,
        pageSize: 10,
      });
      if (error.value) {
        console.error("Failed to fetch articles:", error.value);
      }
      const { code, result } = data?.value ?? ({} as any);
      let { list = [], total: totalNum = 0 } = result || {};
      if (code === 0 && list.length > 5) {
        textList.value = list.slice(0, 5);
        moreLines.value = list.slice(5);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getPageSettings = () => {
    totalPage.value = Math.ceil(total.value / pageSize.value);
  };

  const getArticleList = async () => {
    try {
      const { data, error } = await getArticle({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
      });
      if (error.value) {
        console.error("Failed to fetch articles:", error.value);
      }
      const { code, result } = data?.value ?? ({} as any);
      const { list = [], total: totalNum = 0 } = result || {};
      total.value = totalNum;
      if (code === 0) {
        pageList.value = list.map((item: any) => ({
          title: item.title,
          date: item.createTime,
          content: item.content,
          id: item.id,
        }));
        getPageSettings();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return {
    pageNum,
    pageSize,
    total,
    totalPage,
    getPageSettings,
    pageList,
    textList,
    getArticleList,
    moreLines,
    setLoopList,
  };
};