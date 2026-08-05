<template>
    <section v-show="showEncode" class="alertCnt">

        <div class="cardCnt">

            <div class="header">
                <span :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'">encode</span>
                <div class="iconCnt" @click="handleCancel">
                    <img class="icon" :src="themeStore.theme.label=='light'?cancelIcon.light:cancelIcon.dark" alt="">
                </div>
            </div>
            <div class="middle">
                <input :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" class="input" type="password" placeholder="请输入密码以解密">
            </div>
            <div class="footer">
                <div class="btnCnt">
                    <button :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" class="cancel btn" @click="handleCancel">cancel</button>
                    <button :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" class="confirm btn">confirm</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { cancelIcon } from "~/assets/icon/svg";
import { useThemeStore } from "~~/stores/theme";
const themeStore = useThemeStore()
defineProps<{
    showEncode?: boolean
}>()
const emit = defineEmits<{
    (e:'update:showEncode',value:any):any
}>()
const handleCancel=()=>{
    emit('update:showEncode',false)
}
</script>
<style lang="scss" scoped>
.alertCnt {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.middle{
    width: 100%;
}
.input {
    padding: 6px 10px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(14, 22, 0, 0.2);
    width: 100%;
    border-radius: 10px;
}

.iconCnt {
    &:hover{
        cursor: pointer;
    }
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 16px;
    height: 16px;
    .icon {
        width: 100%;
        height: 100%;
    }
}

.cardCnt {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 20px 20px 20px;
    border-radius: 10px;
    background: rgba(255,255,255);
    width: 20%;
    min-width: 300px;
    aspect-ratio: 1 / 0.3;

    .header {
        position: relative;
        display: flex;
        justify-content: center;
    }

    .footer {
        display: flex;
        justify-content: flex-end;
    }

    .btnCnt {
        display: flex;
        gap: 10px;

        .btn {
            border: none;
            padding: 4px 8px;
            border-radius: 8px;
            &:hover{
                cursor: pointer;
            }
        }

        .cancel {
            background-color: white;
            box-shadow: 0 0 10px rgba(14, 22, 0, 0.2);
        }

        .confirm {
            background: rgba(128, 128, 128,0.2);
        }
    }
}
</style>