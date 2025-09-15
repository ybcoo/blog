import { ref } from "vue";
import { homeIcon, aboutIcon, shareIcon, themeIcon,manageIcon } from "~/assets/icon/svg";
// export const theme = ref<any>({ label: "light", color: "#f6f1ed" });

export const homePic=ref(homeIcon)
export const aboutPic=ref(aboutIcon)
export const sharePic=ref(shareIcon)
export const themePic=ref(themeIcon)
export const managePic=ref(manageIcon)
// export const changeTheme = () => {
//   theme.value.label == "light"
//     ? (theme.value = { label: "dark", color: "#0f1600" })
//     : (theme.value = { label: "light", color: "#f6f1ed" });

    
// };
