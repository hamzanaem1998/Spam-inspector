export function extractLinks(htmlString: string): string[] {
    // Trouver l'index de la fin de la balise </style>
    const styleEndIndex = htmlString.indexOf('</style>');

    // Vérifier si la balise </style> est présente
    if (styleEndIndex === -1) {
        return []; // Retourner un tableau vide si </style> n'est pas trouvé
    }

    // Extraire le contenu après </style>
    const contentAfterStyle = htmlString.substring(styleEndIndex + 8); // +8 pour ignorer la longueur de </style>

    // Utiliser une expression régulière pour trouver tous les href dans le contenu après </style>
    const regex = /href="([^"]*)"/g;
    const links: string[] = [];
    let match;

    // Boucle pour trouver toutes les correspondances de href
    while ((match = regex.exec(contentAfterStyle)) !== null) {
        links.push(match[1]); // Ajouter chaque lien trouvé au tableau des liens
    }

    return links;
}