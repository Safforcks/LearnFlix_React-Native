import { createContext, useContext, useState } from "react";

const context = createContext(null)

const temaClaro = {
    colors: {
        background: "#f5f3ff",
        surface: "white",
        text: "#554be4",
        border: "rgba(85, 75, 228, 0.12)",
        textMuted: "#7c74ed",
        borderImage: "white",
        primary: "#374151"
    }
}

const temaEscuro = {
    colors: {
        background: "#0f172a",
        surface: "#162033",
        text: "white",
        border: "#2b3a55",
        textMuted: "#94a3b8",
        borderImage: "#2b3a55",
        primary: "#b7c2d4"
    }
}

function criarModo(theme) {
    const { colors } = theme

    return {
        colors,
        container: {
            backgroundColor: colors.background
        },
         screen: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: 18,
            paddingVertical: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 18,
            boxShadow: "0px 6px 16px rgba(85, 75, 228, 0.10)",
            elevation: 4,
        },
        titulo: {
            color: colors.primary
        },
        texto: {
            color: colors.text,
            fontWeight: "600"
        },
        perfil: {
            borderWidth: 5,
            borderColor: colors.borderImage,
        },

    }
}

export function ModoProvider({ children }){
    const [escuro, setEscuro] = useState(false)

    const tema = escuro ? temaEscuro : temaClaro
    const modo = criarModo(tema)

    return(
        <context.Provider value={{ escuro, setEscuro, modo, tema }}>
            { children }
        </context.Provider>
    )
}

export function useModo() {
    return useContext(context)
}