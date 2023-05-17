import { IconSize } from "./types";

export const useIconSize = (size: IconSize) => {
    switch (size) {
        case "xs": {
            return "12"
        }
        case "sm": {
            return "16"
        }
        case "md": {
            return "24"
        }
        case "lg": {
            return "30"
        }
        case "xl": {
            return "40"
        }
    }
}