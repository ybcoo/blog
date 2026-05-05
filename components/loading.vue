<template>
    <div class="loading" :class="loadingThemeClass" :style="loadingVars">
        <div class="loader-wrap" :style="{width,height}" aria-label="loading">
            <div class="loader-orb">
                <div class="orbit">
                    <span style="--i: 0"><i>L</i></span>
                    <span style="--i: 1"><i>O</i></span>
                    <span style="--i: 2"><i>A</i></span>
                    <span style="--i: 3"><i>D</i></span>
                    <span style="--i: 4"><i>I</i></span>
                    <span style="--i: 5"><i>N</i></span>
                    <span style="--i: 6"><i>G</i></span>
                </div>
                <div class="crystal" aria-hidden="true"></div>
            </div>
            <div class="loading-line" aria-live="polite">
                <span
                    v-for="(char, index) in slotChars"
                    :key="index"
                    class="jump-char"
                    :class="{ 'is-visible': index < visibleCount }"
                    :style="{ '--delay': `${index * 0.06}s` }"
                >
                    {{ char }}
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useThemeStore } from "~~/stores/theme";

defineProps<{
    width?: string,
    height?: string
}>()

const themeStore = useThemeStore();

const slotChars = ["l", "o", "a", "d", "i", "n", "g", ".", ".", "."];
const visibleCount = ref(1);
const themeLabel = ref<"light" | "dark">("light");

let timer: ReturnType<typeof setInterval> | null = null;

watch(
    () => themeStore.theme?.label,
    (label) => {
        themeLabel.value = label === "dark" ? "dark" : "light";
    },
    { immediate: true }
);

const loadingThemeClass = computed(() => (themeLabel.value === "dark" ? "theme-dark" : "theme-light"));
const toRgba = (color: string, alpha: number) => {
    const hex = color.trim();
    if (!hex.startsWith("#")) return color;
    const normalized = hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;
    if (normalized.length !== 7) return color;
    const r = Number.parseInt(normalized.slice(1, 3), 16);
    const g = Number.parseInt(normalized.slice(3, 5), 16);
    const b = Number.parseInt(normalized.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const loadingVars = computed<Record<string, string>>(() => {
    const isDark = themeLabel.value === "dark";
    const themeColor = themeStore.theme?.color ?? (isDark ? "#0f1600" : "#f6f1ed");

    return {
        "--loading-mask-bg": isDark ? toRgba(themeColor, 0.82) : "rgba(246, 241, 237, 0.82)",
        "--loading-orb-border": isDark ? "rgba(187, 205, 171, 0.34)" : "rgba(255, 255, 255, 0.72)",
        "--loading-orb-bg-start": isDark ? "rgba(53, 71, 43, 0.52)" : "rgba(255, 255, 255, 0.42)",
        "--loading-orb-bg-end": isDark ? "rgba(20, 29, 14, 0.34)" : "rgba(240, 240, 240, 0.18)",
        "--loading-orb-shadow-outer-1": isDark ? "rgba(4, 8, 2, 0.24)" : "rgba(170, 170, 170, 0.28)",
        "--loading-orb-shadow-outer-2": isDark ? "rgba(94, 120, 78, 0.16)" : "rgba(255, 255, 255, 0.7)",
        "--loading-orb-shadow-inner-1": isDark ? "rgba(205, 224, 190, 0.24)" : "rgba(255, 255, 255, 0.85)",
        "--loading-orb-shadow-inner-2": isDark ? "rgba(8, 12, 4, 0.42)" : "rgba(205, 205, 205, 0.35)",
        "--loading-orbit-border": isDark ? "rgba(198, 216, 184, 0.28)" : "rgba(90, 90, 90, 0.2)",
        "--loading-orbit-inner": isDark ? "rgba(200, 220, 186, 0.22)" : "rgba(255, 255, 255, 0.45)",
        "--loading-orbit-text": isDark ? "rgba(220, 231, 212, 0.88)" : "rgba(44, 44, 44, 0.78)",
        "--loading-crystal-start": isDark ? "rgba(224, 236, 212, 0.84)" : "rgba(255, 255, 255, 0.88)",
        "--loading-crystal-mid": isDark ? "rgba(154, 179, 136, 0.34)" : "rgba(232, 232, 232, 0.35)",
        "--loading-crystal-end": isDark ? "rgba(93, 114, 76, 0.34)" : "rgba(186, 186, 186, 0.3)",
        "--loading-crystal-shadow-outer": isDark ? "rgba(154, 179, 136, 0.2)" : "rgba(255, 255, 255, 0.4)",
        "--loading-crystal-shadow-inner-1": isDark ? "rgba(224, 236, 212, 0.34)" : "rgba(255, 255, 255, 0.75)",
        "--loading-crystal-shadow-inner-2": isDark ? "rgba(8, 11, 5, 0.5)" : "rgba(170, 170, 170, 0.35)",
        "--loading-line-border": isDark ? "rgba(189, 206, 173, 0.34)" : "rgba(255, 255, 255, 0.72)",
        "--loading-line-bg": isDark ? "rgba(27, 34, 18, 0.6)" : "rgba(255, 255, 255, 0.36)",
        "--loading-line-shadow": isDark ? "rgba(6, 9, 4, 0.32)" : "rgba(180, 180, 180, 0.25)",
        "--loading-line-shadow-inner-1": isDark ? "rgba(220, 232, 209, 0.2)" : "rgba(255, 255, 255, 0.75)",
        "--loading-line-shadow-inner-2": isDark ? "rgba(8, 12, 4, 0.48)" : "rgba(210, 210, 210, 0.35)",
        "--loading-line-text": isDark ? "rgba(225, 234, 217, 0.9)" : "rgba(52, 52, 52, 0.76)",
    };
});

onMounted(() => {
    timer = setInterval(() => {
        visibleCount.value = visibleCount.value >= slotChars.length ? 1 : visibleCount.value + 1;
    }, 320);
});

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer);
    }
});
</script>
<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--loading-mask-bg);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: background-color 0.35s ease;
}

.loader-wrap {
    --orb-size: clamp(132px, 20vw, 176px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--orb-size);
    aspect-ratio: 1;
}

.loader-orb {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid var(--loading-orb-border);
    background: linear-gradient(145deg, var(--loading-orb-bg-start), var(--loading-orb-bg-end));
    box-shadow:
        20px 20px 45px var(--loading-orb-shadow-outer-1),
        -14px -14px 30px var(--loading-orb-shadow-outer-2),
        inset 1px 1px 0 var(--loading-orb-shadow-inner-1),
        inset -1px -1px 0 var(--loading-orb-shadow-inner-2);
}

.orbit {
    position: absolute;
    inset: 9%;
    border-radius: 50%;
    border: 2px solid var(--loading-orbit-border);
    box-shadow: inset 0 0 0 1px var(--loading-orbit-inner);
    animation: spin 5.2s linear infinite;
}

.orbit span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 2px;
    transform: rotate(calc(var(--i) * 51.428deg));
}

.orbit span i {
    font-style: normal;
    font-size: clamp(8px, 1vw, 10px);
    line-height: 1;
    letter-spacing: 0.01em;
    color: var(--loading-orbit-text);
    transform: rotate(calc(var(--i) * -51.428deg));
}

.crystal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: clamp(22px, 3vw, 30px);
    height: clamp(22px, 3vw, 30px);
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    animation: crystalFlip 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.crystal::before,
.crystal::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: linear-gradient(
        140deg,
        var(--loading-crystal-start),
        var(--loading-crystal-mid) 45%,
        var(--loading-crystal-end)
    );
    border: 1px solid var(--loading-orb-border);
    box-shadow:
        0 0 12px var(--loading-crystal-shadow-outer),
        inset 1px 1px 0 var(--loading-crystal-shadow-inner-1),
        inset -1px -1px 0 var(--loading-crystal-shadow-inner-2);
}

.crystal::before {
    transform: rotate(45deg) rotateY(0deg);
}

.crystal::after {
    transform: rotate(45deg) rotateY(90deg);
    opacity: 0.8;
}

.loading-line {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 12ch;
    min-height: 22px;
    padding: 4px 12px;
    border-radius: 999px;
    border: 1px solid var(--loading-line-border);
    background: var(--loading-line-bg);
    box-shadow:
        0 8px 20px var(--loading-line-shadow),
        inset 1px 1px 0 var(--loading-line-shadow-inner-1),
        inset -1px -1px 0 var(--loading-line-shadow-inner-2);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--loading-line-text);
    font-family: "Consolas", "Menlo", monospace;
    white-space: nowrap;
}

.jump-char {
    display: inline-block;
    width: 1ch;
    text-align: center;
    opacity: 0;
}

.jump-char.is-visible {
    opacity: 1;
    animation: charHop 0.9s ease-in-out infinite;
    animation-delay: var(--delay);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes crystalFlip {
    0% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(0deg);
    }
    25% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(90deg);
    }
    50% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(180deg);
    }
    75% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(270deg);
    }
    100% {
        transform: translate(-50%, -50%) rotateX(8deg) rotateY(360deg);
    }
}

@keyframes charHop {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}

@media (max-width: 480px) {
    .loader-wrap {
        transform: scale(0.92);
    }
}
</style>
