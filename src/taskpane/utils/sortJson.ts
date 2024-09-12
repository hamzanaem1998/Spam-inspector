export function sortJson(jsonObject: Record<string, string>): Record<string, string> {
    // Ordre de tri spécifique
    const order = ["result", "score", "report"];

    // Création d'un nouvel objet pour le tri
    const sortedObject: Record<string, string> = {};

    // Ajouter les clés selon l'ordre défini
    order.forEach((key) => {
        if (jsonObject[key] !== undefined) {
            sortedObject[key] = jsonObject[key];
        }
    });

    // Ajouter les clés restantes qui ne sont pas dans l'ordre spécifié, sauf 'Scan Duration'
    Object.keys(jsonObject).forEach((key) => {
        if (!order.includes(key) && key !== "Scan Duration") {
            sortedObject[key] = jsonObject[key];
        }
    });

    // Placer 'Scan Duration' en dernier
    if (jsonObject["Scan Duration"] !== undefined) {
        sortedObject["Scan Duration"] = jsonObject["Scan Duration"];
    }

    return sortedObject;
}


