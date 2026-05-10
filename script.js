// Objetos parlantes - Script
const MODELS_URL = "https://gen.pollinations.ai/image/models";
const GENERATE_URL = "https://gen.pollinations.ai/image/";

// Plantillas por defecto (desde JSON.txt) para garantizar disponibilidad
const DEFAULT_TEMPLATES = {
  "page_1": {
    "paleta_colores": ["#000000", "#1A1A1A", "#B5FF00", "#CC44FF", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold con estilo tecnológico",
      "secundaria": "Sans-serif regular en blanco",
      "estilo": "Oscura, futurista, de alto contraste"
    },
    "estilo_ilustracion": "Íconos lineales de color neón sobre fondo negro; iconografía tipo outline con detalles de color eléctrico",
    "estructura": "Vertical con cabecera redondeada en negro, cuatro bloques de contenido conectados por flechas curvas en posición alternada izquierda-derecha",
    "elementos_decorativos": ["flechas curvas de neón", "textura de puntos en fondo oscuro", "formas circulares translúcidas en esquinas", "bordes redondeados en caja de título"],
    "tono_visual": "Oscuro, tecnológico, futurista y de alto impacto visual"
  },
  "page_2": {
    "paleta_colores": ["#2EC4B6", "#FFFFFF", "#A8EDDD", "#F7A400", "#E05C5C", "#F0C040", "#6EC9E0"],
    "tipografia": {
      "principal": "Sans-serif bold en verde agua",
      "secundaria": "Sans-serif regular en verde",
      "estilo": "Amigable, juvenil, educativa"
    },
    "estilo_ilustracion": "Ilustraciones vectoriales detalladas de vida marina (peces, medusas, coral, conchas) con estilo semi-realista colorido",
    "estructura": "Composición vertical tipo póster, con título superior y burbujas de diálogo distribuidas en zigzag sobre un fondo de ecosistema oceánico",
    "elementos_decorativos": ["burbujas de diálogo con bordes blancos", "fauna marina variada como fondo ambiental", "gradiente de agua de superficie a fondo marino"],
    "tono_visual": "Lúdico, natural, educativo para niños con ambiente inmersivo"
  },
  "page_3": {
    "paleta_colores": ["#FFFFFF", "#E8F4FB", "#000000", "#F5A623", "#D44EA6", "#7BC8E2", "#6AB04C"],
    "tipografia": {
      "principal": "Script/manuscrita tipo tiza de pizarra",
      "secundaria": "N/A",
      "estilo": "Artesanal, escolar, dibujado a mano"
    },
    "estilo_ilustracion": "Diagrama de flujo dibujado a mano con cajas rectangulares de trazo doble, flechas bold en negro; ilustraciones acuarela de útiles escolares en los márgenes",
    "estructura": "Vertical tipo flowchart con seis cajas conectadas por flechas descendentes, flanqueadas por ilustraciones decorativas a ambos lados",
    "elementos_decorativos": ["útiles escolares en acuarela (tijeras, lápices, regla, pinturas)", "líneas guía horizontales de cuaderno en el fondo", "flechas de trazo grueso"],
    "tono_visual": "Escolar, creativo, orgánico y hecho a mano"
  },
  "page_4": {
    "paleta_colores": ["#F5EDE0", "#8B4513", "#5C2E00", "#FFFFFF", "#C47A3A"],
    "tipografia": {
      "principal": "Sans-serif bold display en marrón oscuro",
      "secundaria": "Sans-serif regular en marrón",
      "estilo": "Gastronómica, cálida, editorial"
    },
    "estilo_ilustracion": "Fotografía real de postre (pastel de chocolate) recortada sobre fondo de forma ondulada marrón; sin ilustraciones vectoriales",
    "estructura": "Vertical tipo portada de revista; cabecera tipográfica grande, dos columnas de texto de contenido, sección inferior con imagen del producto destacado, código de barras y URL",
    "elementos_decorativos": ["forma ondulada marrón que divide la portada", "círculo marrón oscuro con número de volumen", "texto vertical en el lateral izquierdo", "código de barras", "handle y URL en footer"],
    "tono_visual": "Gastronómico, cálido, apetitoso con estética editorial de revista de cocina"
  },
  "page_5": {
    "paleta_colores": ["#7EC8A0", "#F5C5A3", "#E8A0C8", "#9B59B6", "#FFFFFF", "#B5D86F"],
    "tipografia": {
      "principal": "Sans-serif bold lowercase minimalista",
      "secundaria": "Sans-serif condensada para volumen/número",
      "estilo": "Contemporánea, editorial, fresca"
    },
    "estilo_ilustracion": "Fotografía editorial de moda full-bleed; sin ilustraciones, el elemento visual principal es la imagen fotográfica",
    "estructura": "Vertical tipo portada de revista de moda; título tipográfico oversized en esquina superior izquierda, número/volumen en lateral derecho vertical, etiquetas de contenido en esquinas inferiores, código de barras en parte inferior derecha",
    "elementos_decorativos": ["fondo degradado pastel (verde menta a melocotón)", "etiquetas rectangulares con fondo verde claro", "tipografía volumétrica como elemento gráfico", "código de barras", "texto vertical para datos de edición"],
    "tono_visual": "Editorial, contemporáneo, pastel y juvenil con estética de revista de moda alternativa"
  },
  "page_6": {
    "paleta_colores": ["#C4A265", "#1A1A1A", "#FFFFFF", "#8B5E3C", "#F5E6C8"],
    "tipografia": {
      "principal": "Display decorativa con influencia western/vintage en mayúsculas",
      "secundaria": "Sans-serif regular",
      "estilo": "Rústica, vintage, histórica"
    },
    "estilo_ilustracion": "Fotografías en tonos sepia/vintage insertadas como polaroids o recortes, sobre fondo kraft (papel marrón texturizado)",
    "estructura": "Línea de tiempo vertical con puntos conectores y fotografías alternadas izquierda-derecha para cada evento histórico",
    "elementos_decorativos": ["textura de papel kraft como fondo", "línea punteada vertical", "fotografías vintage con marcos", "URL en banner inferior"],
    "tono_visual": "Nostálgico, histórico, documental con estética de archivo"
  },
  "page_7": {
    "paleta_colores": ["#1A1A1A", "#FFFFFF", "#FF5733", "#F39C12", "#2ECC71", "#3498DB"],
    "tipografia": {
      "principal": "Sans-serif bold en blanco",
      "secundaria": "Sans-serif regular en blanco",
      "estilo": "Tecnológica, moderna, clara"
    },
    "estilo_ilustracion": "Íconos outline monocromáticos en blanco; sin ilustraciones figurativas",
    "estructura": "Vertical con secciones diferenciadas: cabecera con definición, fila de habilidades en tres columnas, bloque de beneficios con lista, cuadrícula de áreas de aplicación en 2x3, y bloque final de tendencias futuras",
    "elementos_decorativos": ["bokeh de colores (esferas desenfocadas) en el fondo", "tarjetas redondeadas oscuras como contenedores", "íconos temáticos por categoría", "puntos de viñeta"],
    "tono_visual": "Tecnológico, informativo, elegante con fondo oscuro"
  },
  "page_8": {
    "paleta_colores": ["#C4A265", "#1A1A1A", "#FFFFFF", "#8B6914", "#F5E6C8"],
    "tipografia": {
      "principal": "Serif estilo periódico antiguo (slab serif decorativa)",
      "secundaria": "Serif body text clásica",
      "estilo": "Periodística, clásica, histórica"
    },
    "estilo_ilustracion": "Grabados e ilustraciones históricas en tonos sepia integradas como fotografías editoriales",
    "estructura": "Diseño de newsletter/periódico con cabecera tipográfica, bloques de texto en columnas con imágenes insertadas alternando posición izquierda-derecha",
    "elementos_decorativos": ["textura de papel arrugado como fondo", "líneas divisorias horizontales entre secciones", "ornamento central en el encabezado", "fecha y edición en encabezado"],
    "tono_visual": "Editorial, retro, periodístico y documental"
  },
  "page_9": {
    "paleta_colores": ["#2B2FCC", "#E91E8C", "#FF9800", "#4CAF50", "#F5F5F5", "#FFFFFF"],
    "tipografia": {
      "principal": "Display bold con serifas gruesas en mayúsculas",
      "secundaria": "Sans-serif bold en mayúsculas",
      "estilo": "Enérgica, pop, llamativa"
    },
    "estilo_ilustracion": "Fotografías reales de naturaleza (flores, aves, mariposas) con encuadres circulares; fondos de bloques de color plano",
    "estructura": "Vertical con alternancia de bloques de color, cada bloque contiene una sección de proceso con etiqueta, descripción y fotografía circular",
    "elementos_decorativos": ["formas orgánicas de color como fondo de sección", "estrellas de cuatro puntas", "formas en X", "líneas de contorno decorativas en esquinas", "handle de redes sociales al pie"],
    "tono_visual": "Juvenil, dinámico, colorido y educativo con energía pop"
  },
  "page_10": {
    "paleta_colores": ["#000000", "#1A1A1A", "#B5FF00", "#9933FF", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif condensada ultra bold en minúsculas",
      "secundaria": "Sans-serif regular en blanco",
      "estilo": "Urbana, contemporánea, de impacto"
    },
    "estilo_ilustracion": "Sin ilustraciones figurativas; diseño basado en tipografía grande, numeración bold y bloques de color neón",
    "estructura": "Vertical con introducción y cinco secciones numeradas que alternan fondo negro y verde neón, cada una con número grande, título y cuerpo de texto",
    "elementos_decorativos": ["asteriscos decorativos tipo estrella", "números oversized como elemento gráfico", "flechas de puntero", "handle de redes sociales en banner inferior"],
    "tono_visual": "Urbano, disruptivo, hype, influencer-friendly con estética digital oscura"
  },
  "page_11": {
    "paleta_colores": ["#1B2A6B", "#E91E8C", "#F5A623", "#FFFFFF", "#2C3E8C"],
    "tipografia": {
      "principal": "Sans-serif extrabold en mayúsculas",
      "secundaria": "Sans-serif regular centrada",
      "estilo": "Fuerte, directa, comercial"
    },
    "estilo_ilustracion": "Íconos de emojis/flat design dentro de círculos rosas como elementos visuales de apoyo",
    "estructura": "Vertical con cuatro bloques apilados, cada uno con borde punteado, ícono circular a un lado y texto al lado opuesto, alternando posición",
    "elementos_decorativos": ["bordes punteados en cada bloque", "círculos rosas como contenedores de íconos", "flechas de navegación tipo chevron", "texto footer con fórmula motivacional"],
    "tono_visual": "Comercial, dinámico, dirigido a redes sociales con paleta de marca consistente"
  },
  "page_12": {
    "paleta_colores": ["#1A1A1A", "#2C2C2C", "#FFFFFF", "#888888", "#C0C0C0"],
    "tipografia": {
      "principal": "Sans-serif extrabold display en mayúsculas",
      "secundaria": "Sans-serif regular en blanco",
      "estilo": "Moderna, impactante, corporativa oscura"
    },
    "estilo_ilustracion": "Fotografías reales en color natural, recortadas en rectángulos, alternadas con bloques de texto",
    "estructura": "Línea de tiempo vertical central con años en etiquetas de flecha, fotos alternadas izquierda-derecha para cada década",
    "elementos_decorativos": ["etiquetas en forma de flecha/chevron para años", "línea central vertical", "puntos conectores", "URL en footer"],
    "tono_visual": "Corporativo, premium, oscuro y documental con sensación de historia institucional"
  },
  "page_13": {
    "paleta_colores": ["#F5EDE4", "#E88B7A", "#1A1A1A", "#888888", "#FFFFFF"],
    "tipografia": {
      "principal": "Serif elegante en minúsculas",
      "secundaria": "Sans-serif regular",
      "estilo": "Editorial, minimalista, refinada"
    },
    "estilo_ilustracion": "Fotografías en blanco y negro con alto contraste insertadas como bloques rectangulares",
    "estructura": "Vertical con cabecera tipográfica, cuadrícula 2x3 de etiquetas de conceptos, línea de tiempo vertical con imagen-año-texto alternados",
    "elementos_decorativos": ["etiquetas rectangulares con fondo salmón para conceptos clave", "rombo como marcador de línea de tiempo", "línea divisoria horizontal", "URL en footer bold"],
    "tono_visual": "Minimalista, editorial, sofisticado con paleta neutra y cálida"
  },
  "page_14": {
    "paleta_colores": ["#1F5F5B", "#FFFFFF", "#F5E6C8", "#E8D5A3", "#C0392B", "#1A1A1A"],
    "tipografia": {
      "principal": "Monospace/máquina de escribir para nombre",
      "secundaria": "Sans-serif regular para cuerpos de texto",
      "estilo": "Personal, artesanal, documental"
    },
    "estilo_ilustracion": "Fotografía en blanco y negro con efecto de polaroid/recorte; elementos tipo collage con bordes rasgados",
    "estructura": "Vertical con cabecera tipo collage sobre fondo verde oscuro, seguida de bloques de contenido en dos columnas sobre fondo crema con textura",
    "elementos_decorativos": ["clip de papel decorativo", "bordes rasgados tipo papel", "fotografía polaroid", "textura de tela/lino en fondo", "numeración circular (01, 02, 03)"],
    "tono_visual": "Personal, artesanal, cálido con estética de scrapbook y diario personal"
  },
  "page_15": {
    "paleta_colores": ["#F5D6C0", "#F5C842", "#F0A0B0", "#8B7355", "#FFFFFF", "#333333"],
    "tipografia": {
      "principal": "Script manuscrita estilizada",
      "secundaria": "Script cursiva más ligera",
      "estilo": "Hecha a mano, lúdica, escolar-creativa"
    },
    "estilo_ilustracion": "Fotografías reales en estilo polaroid con borde blanco; ilustraciones planas de útiles escolares (tijeras, lápices, clips, reglas) como decoración",
    "estructura": "Vertical tipo cuaderno espiral con margen izquierdo oscuro y hojas de espiral, cinco pasos numerados con texto e imagen alternados",
    "elementos_decorativos": ["espiral de cuaderno al margen", "íconos de útiles escolares en todo el borde", "texto manuscrito INFOGRAFÍA", "estrellas dibujadas a mano", "handle de red social al pie"],
    "tono_visual": "Escolar, cálido, lúdico con estética handmade y cuaderno de apuntes"
  },
  "page_16": {
    "paleta_colores": ["#E8A0D8", "#9B59B6", "#5DADE2", "#F7DC6F", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Display bold italic con serifas, estilo retro",
      "secundaria": "Sans-serif regular centrada",
      "estilo": "Festiva, llamativa, comercial-pop"
    },
    "estilo_ilustracion": "Ilustraciones 3D render de objetos (megáfonos, monitores, calendarios, tiendas) con estilo colorido y brillante",
    "estructura": "Vertical con cabecera de múltiples colores degradados, seis bloques numerados que alternan la posición del ícono y etiqueta",
    "elementos_decorativos": ["formas geométricas 3D decorativas en cabecera", "numeración en círculos de color", "logo de empresa en footer", "información de contacto al pie"],
    "tono_visual": "Colorido, festivo, comercial con influencia de diseño latinoamericano moderno"
  },
  "page_17": {
    "paleta_colores": ["#0A1628", "#1B3A6B", "#4A90D9", "#FFFFFF", "#B0C4DE"],
    "tipografia": {
      "principal": "Sans-serif bold en blanco",
      "secundaria": "Sans-serif regular en blanco y azul claro",
      "estilo": "Corporativa, moderna, tecnológica"
    },
    "estilo_ilustracion": "Fotografía real de personas en reunión dentro de forma octagonal; sin ilustraciones",
    "estructura": "Horizontal (landscape) con mitad izquierda para texto/logo y mitad derecha para imagen recortada en octágono sobre fondo geométrico oscuro",
    "elementos_decorativos": ["forma octagonal como marco de imagen", "líneas diagonales geométricas en fondo", "cuadrícula de puntos en esquina superior izquierda", "flechas dobles tipo chevron", "banner inferior con URL y fecha"],
    "tono_visual": "Corporativo, premium, tecnológico con paleta azul marino y sensación de confianza institucional"
  },
  "page_18": {
    "paleta_colores": ["#050E1F", "#1A3A8F", "#4D9FFF", "#A0CFFF", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif light/thin en blanco para métricas",
      "secundaria": "Sans-serif regular pequeña en gris claro",
      "estilo": "Data-driven, limpia, tecnológica"
    },
    "estilo_ilustracion": "Sin ilustraciones; diseño basado en tipografía de datos y formas geométricas",
    "estructura": "Horizontal (landscape) con panel izquierdo de texto descriptivo y esfera degradada, panel derecho con cuatro tarjetas de métricas apiladas",
    "elementos_decorativos": ["tarjetas oscuras con borde redondeado", "triángulos azules como indicadores de tendencia alcista", "esfera degradada como elemento de marca", "logo en esquina inferior izquierda"],
    "tono_visual": "Dashboard ejecutivo, data-driven, frío y tecnológico con sensación de reporte financiero"
  },
  "page_19": {
    "paleta_colores": ["#3A2CA0", "#FFFFFF", "#D9D9D9", "#6C63FF", "#B0B8FF"],
    "tipografia": {
      "principal": "Serif elegante",
      "secundaria": "Script/caligrafía",
      "estilo": "Decorativa y creativa"
    },
    "estilo_ilustracion": "Ilustración vectorial tipo doodle con trazos lineales y elementos gráficos planos; libro con doodles, corazón, cara feliz, espiral",
    "estructura": "Composición horizontal con ilustración del libro a la izquierda y título dentro de una forma ovalada azul oscuro a la derecha",
    "elementos_decorativos": ["estrellas de 6 y 4 puntas en diferentes tamaños", "óvalo/elipse como contenedor del título", "textura de semitono sobre el fondo", "elementos doodle en el libro ilustrado"],
    "tono_visual": "Creativo, juvenil, artístico con estética de cuaderno y portafolio estudiantil"
  },
  "page_20": {
    "paleta_colores": ["#000000", "#8B0000", "#CC0000", "#FFFFFF", "#333333"],
    "tipografia": {
      "principal": "Sans-serif monoespaciada/tecnológica en mayúsculas con efecto glow",
      "secundaria": "Sans-serif regular en blanco",
      "estilo": "Tecnológica, dramática, de alto impacto"
    },
    "estilo_ilustracion": "Fondo abstracto con ondas/vórtice de luz roja sobre negro; sin ilustraciones figurativas",
    "estructura": "Horizontal (landscape) con título centrado sobre fondo abstracto fotográfico/renderizado; subtítulo en tipografía más pequeña debajo del título principal",
    "elementos_decorativos": ["ondas de luz roja con efecto de movimiento/vórtice", "brillo/glow en la tipografía principal", "degradado de negro a rojo profundo"],
    "tono_visual": "Oscuro, dramático, cinematográfico con fuerte carga de tensión y urgencia tecnológica"
  },
  "page_21": {
    "paleta_colores": ["#2A1FA8", "#4A3FD4", "#00E5FF", "#7B68EE", "#FFFFFF", "#C0C0C0"],
    "tipografia": {
      "principal": "Sans-serif bold tecnológica en mayúsculas con efecto pixelado/retro",
      "secundaria": "Sans-serif regular pequeña en blanco",
      "estilo": "Gaming, retro-futurista, sci-fi"
    },
    "estilo_ilustracion": "Manos robóticas 3D fotorrealistas como elementos principales; fondo de rejilla retro-futurista tipo synthwave",
    "estructura": "Horizontal (landscape) con panel central de texto sobre fondo púrpura con bordes de interfaz HUD, manos robóticas a ambos lados emergiendo desde abajo",
    "elementos_decorativos": ["rejilla de perspectiva tipo synthwave en fondo", "bordes decorativos de interfaz HUD/panel", "destellos de luz en las manos", "forma de diamante/chevron en panel inferior", "nombre de empresa en etiqueta superior"],
    "tono_visual": "Futurista, gaming, retro-sci-fi con alta energía visual y estética cyberpunk/synthwave"
  },
  "page_22": {
    "paleta_colores": ["#0A1628", "#1B3A6B", "#00BFFF", "#FFFFFF", "#1A1A2E"],
    "tipografia": {
      "principal": "Sans-serif bold en blanco para título",
      "secundaria": "Sans-serif regular pequeña en blanco",
      "estilo": "Tecnológica, premium, futurista"
    },
    "estilo_ilustracion": "Renderizado 3D fotorrealista de cabeza robótica/androide con cerebro transparente iluminado; red de nodos y conexiones como fondo",
    "estructura": "Horizontal (landscape) con texto e información de marca en panel izquierdo, imagen del androide ocupando el panel derecho, red de conexiones como fondo unificado",
    "elementos_decorativos": ["red de nodos y líneas de conexión en fondo", "cerebro iluminado en azul dentro de la cabeza del androide", "logo circular con perfil de IA", "URL en borde redondeado a modo de botón", "información de empresa en esquina superior"],
    "tono_visual": "Tecnológico, premium, futurista con fuerte narrativa de inteligencia artificial corporativa"
  },
  "page_23": {
    "paleta_colores": ["#1A0A2E", "#2D0A5E", "#F5A800", "#FFFFFF", "#3B1F8C", "#E8E8FF"],
    "tipografia": {
      "principal": "Sans-serif extrabold en blanco para siglas",
      "secundaria": "Sans-serif regular en mayúsculas con espaciado amplio",
      "estilo": "Minimalista, premium, de alto impacto"
    },
    "estilo_ilustracion": "Fondo abstracto con partículas/puntos de luz en patrón de ola sinusoidal; destellos de luz naranja dorado como elementos de textura",
    "estructura": "Horizontal (landscape) completamente centrada: siglas grandes en el centro, línea divisoria horizontal, subtítulo debajo, todo sobre fondo abstracto de partículas",
    "elementos_decorativos": ["partículas de luz en curva sinusoidal sobre fondo oscuro", "destellos de luz naranja-dorado en esquinas", "línea divisoria horizontal entre título y subtítulo", "efecto de bokeh sutil"],
    "tono_visual": "Misterioso, premium, sofisticado con fuerte contraste y elegancia oscura orientada a ciberseguridad"
  },
  "page_24": {
    "paleta_colores": ["#FFB8C8", "#FF6B35", "#FF9EBC", "#FFFFFF", "#F0F0F0", "#333333"],
    "tipografia": {
      "principal": "Sans-serif bold en negro",
      "secundaria": "N/A",
      "estilo": "Limpia, moderna, directa"
    },
    "estilo_ilustracion": "Render 3D de cintas/bandas translúcidas de colores cálidos (rosa, naranja, coral) entrelazadas con efecto de vidrio/cristal; tarjeta blanca central con texto",
    "estructura": "Horizontal (landscape) con elemento visual 3D dominando el fondo y una tarjeta blanca flotante con texto e indicadores de párrafo en el centro",
    "elementos_decorativos": ["cintas 3D translúcidas de colores cálidos entrelazadas", "efecto glassmorphism en la tarjeta central", "líneas horizontales simulando texto de párrafo dentro de la tarjeta", "indicadores de esquina tipo bracket en la tarjeta"],
    "tono_visual": "Moderno, creativo, aireado con estética de diseño 3D contemporáneo y sensación de creatividad editorial"
  },
  "page_25": {
    "paleta_colores": ["#FFFFFF", "#1B3A6B", "#E8A040", "#F5EDD5", "#5A8FC8"],
    "tipografia": {
      "principal": "Sans-serif extrabold en azul oscuro",
      "secundaria": "Sans-serif regular en blanco dentro del botón",
      "estilo": "Amigable, educativa, clara"
    },
    "estilo_ilustracion": "Ilustración vectorial flat de libros apilados con útiles escolares; hojas decorativas; estilo plano con paleta limitada de azul y naranja",
    "estructura": "Vertical tipo portada de hoja de trabajo escolar; ilustración central superior dentro de círculo azul oscuro, título en caja crema central, botón en parte inferior",
    "elementos_decorativos": ["formas orgánicas azul oscuro en esquinas (superior derecha e inferior izquierda)", "estrellas de cuatro puntas en naranja y azul", "línea punteada naranja como marco decorativo", "hojas/laureles decorativos en naranja claro", "borde crema alrededor del título"],
    "tono_visual": "Educativo, amigable, organizado con paleta cálida y estructura académica accesible"
  },
  "page_26": {
    "paleta_colores": ["#F5C800", "#1A1A1A", "#CC0000", "#FFFFFF", "#888888"],
    "tipografia": {
      "principal": "Display slab-serif bold italic con contorno en mayúsculas estilo comic",
      "secundaria": "Sans-serif bold italic en rojo",
      "estilo": "Cómica, explosiva, retro pop art"
    },
    "estilo_ilustracion": "Ilustración vectorial de superhéroe estilo cómic americano clásico (flat con sombras simples); skyline de ciudad en blanco y negro al fondo",
    "estructura": "Vertical tipo portada de revista de cómic: título tipográfico masivo en la parte superior, personaje central dominando la composición, texto de llamada en forma de explosión a la derecha",
    "elementos_decorativos": ["forma de explosión/star-burst como globo de texto", "líneas de velocidad/acción detrás del personaje", "skyline urbano silueteado en la parte inferior", "contornos gruesos en toda la ilustración estilo impresión"],
    "tono_visual": "Dinámico, retro, pop art clásico con energía de cómic de superhéroes de los años 60-70"
  },
  "page_27": {
    "paleta_colores": ["#5BB8D4", "#87CEEB", "#FFFFFF", "#C8D8E8", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultrawide bold en mayúsculas en blanco",
      "secundaria": "Sans-serif bold en blanco",
      "estilo": "Editorial, impactante, ambiental"
    },
    "estilo_ilustracion": "Fotografía real de icebergs árticos como fondo full-bleed; sin ilustraciones, el impacto es completamente fotográfico",
    "estructura": "Vertical tipo portada de revista ambiental; título tipográfico en la parte superior sobre el cielo, fotografía dominando el centro-inferior, texto de artículo en la parte inferior izquierda sobre la imagen",
    "elementos_decorativos": ["línea divisoria delgada en la parte superior", "texto de edición en pequeño", "subtítulo en cursiva como tagline", "texto de artículo flotando sobre la fotografía"],
    "tono_visual": "Impactante, documental, urgente con narrativa medioambiental a través de la fotografía"
  },
  "page_28": {
    "paleta_colores": ["#F5A623", "#2D2B5E", "#F5EDD5", "#3B8FB5", "#E07020"],
    "tipografia": {
      "principal": "Sans-serif extrabold con serifas decorativas en azul oscuro",
      "secundaria": "Sans-serif bold en azul oscuro",
      "estilo": "Editorial, moderna con carácter, narrativa"
    },
    "estilo_ilustracion": "Ilustración vectorial/digital de mujer leyendo un libro del que emergen elementos fantásticos (planetas, edificios, criaturas, colores) estilo flat con degradados",
    "estructura": "Vertical tipo portada de revista literaria: datos de edición en la parte superior, título masivo tipográfico, burbuja/mancha orgánica crema como contenedor de subtítulo, ilustración dominando el panel derecho-inferior",
    "elementos_decorativos": ["burbuja orgánica crema como contenedor de texto", "datos de fecha y número en la parte superior", "nombre de editorial en la parte inferior izquierda", "elementos fantásticos emergiendo del libro (planetas, geometría, naturaleza)"],
    "tono_visual": "Imaginativo, literario, cálido y narrativo con estética de revista de cuentos y storytelling"
  },
  "page_29": {
    "paleta_colores": ["#0A0A2E", "#1A1A4E", "#B5FF00", "#CC44FF", "#FF6B35", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif extrabold en mayúsculas con efecto neón/glow",
      "secundaria": "Sans-serif regular pequeña en blanco",
      "estilo": "Futurista, tecnológica, de impacto visual"
    },
    "estilo_ilustracion": "Ilustración 3D/AI de cabeza humana con cerebro multicolor visible; íconos planos en tarjetas de contenido",
    "estructura": "Vertical con cabecera tipográfica neón, ilustración central dominante, y cuatro tarjetas de contenido en cuadrícula 2x2 arriba y abajo de la imagen",
    "elementos_decorativos": ["efecto glow/neón en tipografía del título", "partículas y destellos alrededor del cerebro", "formas de onda en esquinas superiores", "tarjetas con borde oscuro semitransparente"],
    "tono_visual": "Futurista, sci-fi, de alto impacto con estética de inteligencia artificial y neurociencia"
  },
  "page_30": {
    "paleta_colores": ["#8B0A2A", "#CC1A3A", "#E8740A", "#FFFFFF", "#F5E0C8"],
    "tipografia": {
      "principal": "Serif condensada con spacing amplio en mayúsculas",
      "secundaria": "Script cursiva oversized en blanco",
      "estilo": "Editorial fashion, dramática, femenina"
    },
    "estilo_ilustracion": "Fotografía editorial de moda como elemento dominante full-bleed; sin ilustraciones vectoriales",
    "estructura": "Vertical tipo póster/invitación de evento, con texto tipográfico superpuesto sobre la fotografía en múltiples tamaños y estilos, datos del evento distribuidos en la composición",
    "elementos_decorativos": ["tipografía script oversized como elemento gráfico principal (young wild)", "contraste tipográfico entre serif condensada y script", "información de evento integrada en la composición fotográfica"],
    "tono_visual": "Dramático, fashion, seductor con estética editorial de alto impacto y ambiente festivo"
  },
  "page_31": {
    "paleta_colores": ["#050E1F", "#1A3A8F", "#4D9FFF", "#A0CFFF", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif light/thin en blanco para título display",
      "secundaria": "Sans-serif regular pequeña",
      "estilo": "Minimalista, tecnológica, premium"
    },
    "estilo_ilustracion": "Esferas degradadas superpuestas (azul eléctrico a azul cielo) como elemento gráfico abstracto principal",
    "estructura": "Horizontal (landscape) con texto alineado a la izquierda y elemento gráfico circular a la derecha, logo en esquina superior izquierda",
    "elementos_decorativos": ["esferas concéntricas con degradado azul", "logo de asterisco/estrella en azul", "espacios en blanco generosos", "tipografía como único elemento estructural"],
    "tono_visual": "Ultra minimalista, premium, tecnológico con estética de marca global sofisticada"
  },
  "page_32": {
    "paleta_colores": ["#000000", "#1A1100", "#C8A000", "#F5D040", "#FFFFFF"],
    "tipografia": {
      "principal": "Script/caligrafía elegante en dorado para el nombre del evento",
      "secundaria": "Sans-serif con espaciado amplio (tracking) en dorado",
      "estilo": "Lujosa, elegante, festiva"
    },
    "estilo_ilustracion": "Sin ilustraciones; diseño basado en tipografía y fondo fotográfico bokeh de luces doradas",
    "estructura": "Vertical tipo invitación formal; título en la parte superior, nombre del evento dominante en el centro con script, línea divisoria con estrella, datos del evento en la parte inferior con información de contacto",
    "elementos_decorativos": ["marco decorativo dorado en los cuatro bordes con esquinas ornamentales", "estrella de cuatro puntas como separador central", "bokeh de luces doradas como fondo", "líneas horizontales doradas como separadores", "estrellas en las cuatro esquinas del marco"],
    "tono_visual": "Lujoso, elegante, celebratorio con paleta negro y oro clásica de alta gama"
  },
  "page_33": {
    "paleta_colores": ["#FFD700", "#FF4500", "#CC0000", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif extrabold en rojo y negro en mayúsculas",
      "secundaria": "Sans-serif bold en negro",
      "estilo": "Comercial, enérgica, apetitosa"
    },
    "estilo_ilustracion": "Fotografías reales de comida (platos variados) en composición collage con mezcla de encuadres rectangulares y circulares",
    "estructura": "Vertical tipo flyer de restaurante; parte superior con collage de fotografías de comida, parte inferior con fondo amarillo brillante con nombre del servicio, información de contacto y detalles de pedido",
    "elementos_decorativos": ["etiquetas rojas en forma de gota/blob con precios", "etiqueta circular con descuento especial en rojo", "líneas diagonales de separación entre fotografías", "patrón de puntos de semitono en fondo amarillo", "rayos de sol estilizados en el fondo", "información de contacto en footer"],
    "tono_visual": "Enérgico, apetitoso, comercial con paleta amarillo-rojo de alta atracción visual para food delivery"
  },
  "page_34": {
    "paleta_colores": ["#0D0D1A", "#1A0A2E", "#00E5FF", "#FF2D78", "#FFFFFF", "#7B68EE"],
    "tipografia": {
      "principal": "Sans-serif bold redondeada en blanco",
      "secundaria": "Sans-serif regular pequeña en blanco",
      "estilo": "Gaming, futurista, de impacto"
    },
    "estilo_ilustracion": "Fotografía/render 3D de corredor futurista tipo sci-fi con iluminación neón como fondo full-bleed",
    "estructura": "Vertical tipo portada de libro/revista con imagen de fondo full-bleed, título centrado en el medio, y crédito en la parte inferior",
    "elementos_decorativos": ["iluminación neón cian y magenta en el corredor", "perspectiva de punto de fuga central dramática", "elementos metálicos y mecánicos en el fondo"],
    "tono_visual": "Oscuro, cinematográfico, sci-fi y cyberpunk con alta carga dramática visual"
  },
  "page_35": {
    "paleta_colores": ["#1B2A6B", "#FFFFFF", "#F0EEE9", "#4A5FAD"],
    "tipografia": {
      "principal": "Sans-serif bold condensada",
      "secundaria": "Sans-serif regular",
      "estilo": "Fuerte, limpia y directa"
    },
    "estilo_ilustracion": "Fotografías en escala de grises con tono azulado dentro de círculos recortados",
    "estructura": "Vertical tipo infografía, alternando bloques de texto e imagen en zigzag, con íconos rectangulares de color sólido como encabezados de sección",
    "elementos_decorativos": ["rectángulos de color como etiquetas de sección", "círculos como marcos de foto", "flecha decorativa azul al final", "sello/badge DONE al cierre"],
    "tono_visual": "Profesional, sobrio, corporativo con toque educativo"
  },
  "page_36": {
    "paleta_colores": ["#F5A800", "#D81B8A", "#FF6B00", "#6A1FC2", "#00AEEF", "#000000", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif extrabold en mayúsculas",
      "secundaria": "Sans-serif regular en minúsculas",
      "estilo": "Impactante, geométrica, de alto contraste"
    },
    "estilo_ilustracion": "Íconos lineales monocromáticos en blanco sobre fondos de colores sólidos vibrantes",
    "estructura": "Vertical con secciones de color en bloques apilados, cada sección con título a la izquierda o derecha alternado y texto descriptivo al lado opuesto",
    "elementos_decorativos": ["flechas curvas de conexión entre bloques", "íconos temáticos por sección", "separadores visuales de color"],
    "tono_visual": "Energético, didáctico, colorido y visualmente disruptivo"
  },
  "page_37": {
    "paleta_colores": ["#C0392B", "#3B5BDB", "#F6C90E", "#FFFFFF", "#F0A8A8", "#B0BFF5"],
    "tipografia": {
      "principal": "Sans-serif extrabold display con serifas decorativas",
      "secundaria": "Sans-serif regular",
      "estilo": "Audaz, retro-moderna, llamativa"
    },
    "estilo_ilustracion": "Diseño plano (flat design) con formas geométricas rectangulares apiladas, sin ilustraciones figurativas",
    "estructura": "Vertical con cuatro bloques numerados (1–4), alternando entre posición izquierda y derecha para etiquetas y contenido",
    "elementos_decorativos": ["estrellas de cuatro puntas decorativas", "etiquetas de colores con bordes redondeados", "números grandes en cajas de color", "URL en parte inferior"],
    "tono_visual": "Vibrante, moderno, comercial con influencia gráfica pop"
  },
  "page_38": {
    "paleta_colores": ["#FFFFFF", "#F5F5F5", "#E63C2F", "#1A3EBD", "#333333"],
    "tipografia": {
      "principal": "Sans-serif ultrawide bold en mayúsculas",
      "secundaria": "Sans-serif regular",
      "estilo": "Contundente, minimalista, con fuerte jerarquía"
    },
    "estilo_ilustracion": "Sin ilustraciones; diseño basado en tipografía y línea vertical como elemento estructural",
    "estructura": "Línea de tiempo vertical centrada, con año a la izquierda, punto de conexión y texto descriptivo a la derecha",
    "elementos_decorativos": ["línea vertical central", "puntos como conectores de eventos", "fondo con textura de papel arrugado"],
    "tono_visual": "Histórico, austero, limpio y académico"
  }
};

let TEMPLATES = DEFAULT_TEMPLATES;

// Construye un resumen textual de la plantilla para usar como system prompt
function templateToPrompt(templateObj) {
    if (!templateObj) return '';
    const colores = templateObj.paleta_colores ? `Paleta de colores: ${templateObj.paleta_colores.join(', ')}.` : '';
    const tipografia = templateObj.tipografia ? `Tipografía principal: ${templateObj.tipografia.principal}. Estilo: ${templateObj.tipografia.estilo}.` : '';
    const ilustracion = templateObj.estilo_ilustracion ? `Estilo de ilustración: ${templateObj.estilo_ilustracion}.` : '';
    const estructura = templateObj.estructura ? `Estructura: ${templateObj.estructura}.` : '';
    const decorativos = templateObj.elementos_decorativos ? `Elementos decorativos: ${templateObj.elementos_decorativos.join(', ')}.` : '';
    const tono = templateObj.tono_visual ? `Tono visual: ${templateObj.tono_visual}.` : '';
    return `${colores} ${tipografia} ${ilustracion} ${estructura} ${decorativos} ${tono}`.trim();
}

// Fallback de objetos (si el PDF no se puede parsear) - ampliado a 50
const FALLBACK_OBJECTS = [
"Apple","Ball","Book","Chair","Clock","Cup","Candle","Car","Cat","Dog",
"Phone","Lamp","Spoon","Fork","Pencil","Backpack","Guitar","Hat","Shoe","Watch",
"Balloon","Bottle","Camera","Glasses","Key","Paintbrush","Plant","Radio","Robot","Teddy Bear",
"Toothbrush","Umbrella","Violin","Wallet","Bottlecap","Kettle","Teapot","Microwave","Toaster","Basket",
"Mirror","Clockwork","Lantern","Stool","Map","Globe","BottleOpener","Compass","Binoculars","Calculator"
];

// Traducciones español (mapa para los objetos por defecto)
const TRANSLATIONS_ES = {
    "Apple":"Manzana","Ball":"Pelota","Book":"Libro","Chair":"Silla","Clock":"Reloj","Cup":"Taza","Candle":"Vela","Car":"Coche","Cat":"Gato","Dog":"Perro",
    "Phone":"Teléfono","Lamp":"Lámpara","Spoon":"Cuchara","Fork":"Tenedor","Pencil":"Lápiz","Backpack":"Mochila","Guitar":"Guitarra","Hat":"Sombrero","Shoe":"Zapato","Watch":"Reloj",
    "Balloon":"Globo","Bottle":"Botella","Camera":"Cámara","Glasses":"Gafas","Key":"Llave","Paintbrush":"Pincel","Plant":"Planta","Radio":"Radio","Robot":"Robot","Teddy Bear":"Osito",
    "Toothbrush":"Cepillo de dientes","Umbrella":"Paraguas","Violin":"Violín","Wallet":"Cartera","Bottlecap":"Tapón","Kettle":"Hervidor","Teapot":"Tetera","Microwave":"Microondas","Toaster":"Tostadora","Basket":"Cesta",
    "Mirror":"Espejo","Clockwork":"Mecanismo de reloj","Lantern":"Linterna","Stool":"Taburete","Map":"Mapa","Globe":"Globo terráqueo","BottleOpener":"Abrelatas","Compass":"Brújula","Binoculars":"Binoculares","Calculator":"Calculadora"
};

// Estado actual (no objetos ahora sino plantillas)
let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    // restore API key
    const saved = localStorage.getItem('pollinations_api_key');
    if (saved) document.getElementById('apiKeyInput').value = saved;

    document.getElementById('loadPdfBtn') && (document.getElementById('loadPdfBtn').onclick = () => loadPdfObjects());
    document.getElementById('genImageBtn') && (document.getElementById('genImageBtn').onclick = () => generateImageFromPrompt());

    // Cargar plantillas desde JSON.txt y luego modelos remotos
    loadTemplatesFromJSON();
    fetchAndPopulateModels();
    // attempt automatic load (silently) if PDF exists
    fetch('./OBJETOS PARLANTES.pdf', { method: 'HEAD' }).then(r => { if (r.ok) loadPdfObjects(); }).catch(()=>{});
});
    (function(){
        // Small UI glue: personalizado accept button, studio inclusion, and prompt auto-update
        const waitFor = (id)=>{let i=0; return new Promise((res)=>{const t=setInterval(()=>{i++; if(document.getElementById(id)|| i>50){clearInterval(t); res(document.getElementById(id));}},50);});};

        Promise.all([waitFor('object_select')]).then(nodes=>{
            const objectSelect = document.getElementById('object_select');
            // when plantilla changes, update system prompt preview
            objectSelect.addEventListener('change', ()=> updatePromptsForSelection());
            // inputs that affect prompt
            const rev = document.getElementById('revista_nombre');
            const edi = document.getElementById('editorial_input');
            if (rev) rev.addEventListener('input', updatePromptsForSelection);
            if (edi) edi.addEventListener('input', updatePromptsForSelection);
            
            // app mode switch
            const modeSelect = document.getElementById('app_mode');
            if (modeSelect) modeSelect.addEventListener('change', changeAppMode);
        });
    })();

async function loadPdfObjects() {
    const pdfPath = './OBJETOS PARLANTES.pdf';
    try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        let fullText = '';
        for (let i=1;i<=Math.min(10,pdf.numPages);i++){
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strs = content.items.map(s=>s.str).join(' ');
            fullText += '\n' + strs;
        }

        // sencillo: separar por saltos, comas o puntos y filtrar tokens útiles
        const tokens = fullText.split(/\n|,|\.|;|\t/).map(t=>t.trim()).filter(t=>t.length>1);
        const uniques = [];
        for (const t of tokens) {
            const clean = t.replace(/[^ -\u007F\w\s\-]/g,'').trim();
            if (!clean) continue;
            if (clean.length > 60) continue;
            if (!uniques.includes(clean)) uniques.push(clean);
            if (uniques.length>=50) break;
        }
        if (uniques.length >= 8) {
            // store english originals
            currentObjectsEnglish = uniques.slice(0,50);
            // generate spanish translations using map when possible
            currentObjectsSpanish = currentObjectsEnglish.map(e => TRANSLATIONS_ES[e] || e);
            populateObjectSelect(currentLang === 'es' ? currentObjectsSpanish : currentObjectsEnglish);
            return;
        }
    } catch (e) { console.warn('PDF parse failed', e); }
    // fallback
    // populate fallback and set current arrays
    currentObjectsEnglish = FALLBACK_OBJECTS.slice(0,50);
    currentObjectsSpanish = currentObjectsEnglish.map(e => TRANSLATIONS_ES[e] || e);
    populateObjectSelect(currentLang === 'es' ? currentObjectsSpanish : currentObjectsEnglish);
}

// Cargar plantillas desde JSON.txt
async function loadTemplatesFromJSON() {
    try {
        const resp = await fetch('./JSON.txt');
        const data = await resp.json();
        TEMPLATES = data;
        // populate selector with Modelo 1..7
        const sel = document.getElementById('object_select');
        if (!sel) return;
        // hidden input holds selected template key
        sel.value = 'page_1';
        renderTemplateThumbnails();
        updatePromptsForSelection();
    } catch (e) {
        console.warn('No se pudo cargar JSON.txt', e);
        // fallback: populate Modelo 1..7 without details
        const sel = document.getElementById('object_select');
        if (!sel) return;
        sel.value = 'page_1';
        renderTemplateThumbnails();
    }
}

// Render thumbnails for each plantilla into #template_list
function renderTemplateThumbnails(){
    const container = document.getElementById('template_list');
    const sel = document.getElementById('object_select');
    if (!container || !sel) return;
    container.innerHTML = '';
    const key = getApiKey();
    const templateKeys = Object.keys(TEMPLATES).slice(0,38);
    templateKeys.forEach((tk, idx) => {
        const card = document.createElement('div');
        card.style.display = 'flex';
        card.style.gap = '8px';
        card.style.alignItems = 'center';
        card.style.cursor = 'pointer';
        card.style.padding = '6px';
        card.style.border = '1px solid transparent';
        card.style.borderRadius = '6px';

        const img = document.createElement('img');
        img.alt = `Modelo ${idx+1}`;
        img.style.width = '100%';
        img.style.maxWidth = '100%';
        img.style.height = '110px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';

        const right = document.createElement('div');
        right.style.minWidth = '80px';
        right.style.display = 'flex';
        right.style.flexDirection = 'column';
        right.style.gap = '6px';

        const label = document.createElement('div');
        label.textContent = `Modelo ${idx+1}`;
        label.style.fontSize = '13px';
        label.style.color = '#222';

        right.appendChild(label);
        card.appendChild(img);
        card.appendChild(right);

        // click selects this template
        card.addEventListener('click', ()=>{
            // mark hidden input
            sel.value = tk;
            // highlight
            Array.from(container.children).forEach(c=> c.style.border='1px solid transparent');
            card.style.border = '2px solid #007ef6';
            updatePromptsForSelection();
        });

        // highlight if current
        if (sel.value === tk) {
            card.style.border = '2px solid #007ef6';
        }

        // Use local images from the images/ folder for thumbnails (modelo1.png, modelo2.png, ...)
        const localSrc = `images/modelo${idx+1}.png`;
        img.src = localSrc;
        img.onload = ()=>{};
        img.onerror = ()=>{
            if (img.src.includes('.png')) {
                img.src = `images/modelo${idx+1}.jpg`;
            } else {
                img.style.background='#ddd'; img.alt='No preview';
            }
        };

        container.appendChild(card);
    });
}

function populateObjectSelect(list) {
    const sel = document.getElementById('object_select');
    if (!sel) return;
    // If object_select is a hidden input (we replaced selector by thumbnails), set its value
    const items = list.slice(0,50);
    if (sel.tagName === 'INPUT') {
        sel.value = items[0] || '';
        // refresh prompts and thumbnails
        try { renderTemplateThumbnails(); } catch(e){}
        return;
    }
    sel.innerHTML = '';
    items.forEach((it, idx) => {
        const opt = document.createElement('option');
        opt.value = it;
        opt.textContent = `${(idx+1).toString().padStart(2,'0')}. ${it}`;
        sel.appendChild(opt);
    });
    // add personalizado option at end (kept for compatibility)
    const customOpt = document.createElement('option');
    customOpt.value = 'personalizado';
    customOpt.textContent = `${(items.length+1).toString().padStart(2,'0')}. personalizado`;
    sel.appendChild(customOpt);
}

const INFOGRAFIA_CONFIG = {
  "infografia_impactante": {
    "definicion": "Una infografía impactante combina diseño visual, jerarquía de información y narrativa clara para comunicar una idea de forma rápida y memorable.",
    "configuracion": {
      "objetivo": {
        "descripcion": "Definir una sola idea central.",
        "tipos": [
          "informar",
          "comparar",
          "explicar un proceso",
          "convencer",
          "mostrar estadísticas",
          "contar una historia"
        ],
        "ejemplos": [
          "Cómo detectar noticias falsas",
          "Impacto del cambio climático",
          "La evolución del internet",
          "Tipos de orquídeas colombianas"
        ]
      }
    },
    "partes": [
      {
        "nombre": "titulo_principal",
        "funcion": "Captar la atención inmediata.",
        "caracteristicas": [
          "corto",
          "poderoso",
          "muy visible"
        ],
        "ejemplos": [
          "La era de la desinformación",
          "¿Qué está pasando con el planeta?",
          "Anatomía de una fake news"
        ],
        "diseno": {
          "tamano_fuente": "grande",
          "contraste": "alto",
          "maximo_palabras": 10
        }
      },
      {
        "nombre": "subtitulo",
        "funcion": "Contextualizar el tema.",
        "ejemplo": "Millones de personas comparten información falsa cada día sin verificarla."
      },
      {
        "nombre": "introduccion_visual",
        "funcion": "Crear impacto emocional y definir el tono.",
        "elementos": [
          "ilustración central",
          "personaje",
          "mapa",
          "ícono gigante",
          "fotografía simbólica"
        ]
      },
      {
        "nombre": "bloques_de_informacion",
        "funcion": "Desarrollar las ideas principales.",
        "componentes": [
          "subtítulo",
          "texto corto",
          "íconos",
          "imágenes",
          "datos clave"
        ],
        "regla": "menos texto, más visualidad"
      },
      {
        "nombre": "jerarquia_visual",
        "funcion": "Guiar la mirada del lector.",
        "recursos": [
          "tamaños",
          "colores",
          "espacios",
          "flechas",
          "líneas",
          "contrastes"
        ]
      },
      {
        "nombre": "elementos_graficos",
        "funcion": "Hacer la infografía memorable.",
        "tipos": [
          "íconos",
          "diagramas",
          "ilustraciones",
          "estadísticas",
          "gráficas",
          "líneas de tiempo",
          "mapas",
          "siluetas",
          "círculos informativos"
        ]
      },
      {
        "nombre": "paleta_de_colores",
        "funcion": "Crear identidad visual y contraste.",
        "formula": {
          "color_dominante": 1,
          "color_secundario": 1,
          "color_de_acento": 1
        },
        "ejemplos": [
          "negro + blanco + rojo",
          "azul oscuro + cian + naranja",
          "beige + verde oliva + dorado"
        ],
        "maximo_colores": 4
      },
      {
        "nombre": "tipografia",
        "funcion": "Facilitar la lectura rápida.",
        "reglas": {
          "fuentes_maximas": 2,
          "titulo": 1,
          "texto": 1
        },
        "combinaciones_recomendadas": [
          "Bebas Neue + Montserrat",
          "Poppins + Open Sans",
          "Anton + Roboto"
        ]
      },
      {
        "nombre": "datos_destacados",
        "funcion": "Generar impacto visual inmediato.",
        "ejemplo": {
          "dato": "73%",
          "descripcion": "de las personas comparten noticias sin leerlas completas."
        }
      },
      {
        "nombre": "flujo_narrativo",
        "funcion": "Construir una historia visual.",
        "estructura": [
          "problema",
          "desarrollo",
          "datos",
          "consecuencias",
          "solución",
          "cierre"
        ]
      },
      {
        "nombre": "cierre",
        "funcion": "Dejar una idea memorable.",
        "ejemplo": "En la era digital, verificar es una responsabilidad colectiva."
      },
      {
        "nombre": "fuentes_y_creditos",
        "funcion": "Dar credibilidad.",
        "incluye": [
          "estadísticas",
          "autores",
          "sitios consultados",
          "logos"
        ]
      }
    ],
    "claves_profesionales": [
      "usar mucho espacio en blanco",
      "usar íconos coherentes",
      "mantener alto contraste",
      "usar textos cortos",
      "crear diseño modular",
      "mantener un solo estilo visual"
    ],
    "errores_a_evitar": [
      "mucho texto",
      "colores exagerados",
      "fuentes difíciles",
      "saturación visual",
      "información desordenada",
      "imágenes de baja calidad"
    ],
    "estructura_visual_clasica": [
      "título impactante",
      "subtítulo",
      "imagen central",
      "bloques de información",
      "estadísticas",
      "conclusión",
      "fuentes"
    ],
    "estilos_modernos": [
      {
        "nombre": "minimalista",
        "caracteristicas": [
          "fondo limpio",
          "pocos colores",
          "elegante"
        ]
      },
      {
        "nombre": "cyberpunk",
        "caracteristicas": [
          "neones",
          "tecnología",
          "alto contraste"
        ]
      },
      {
        "nombre": "editorial",
        "caracteristicas": [
          "tipo revista",
          "sofisticada",
          "jerarquía visual"
        ]
      },
      {
        "nombre": "isometrica",
        "caracteristicas": [
          "objetos 3D",
          "dinámica"
        ]
      },
      {
        "nombre": "retro",
        "caracteristicas": [
          "texturas vintage",
          "tonos envejecidos"
        ]
      }
    ],
    "formula_de_impacto_visual": {
      "visual": "70%",
      "jerarquia": "20%",
      "texto": "10%"
    },
    "tip_personal": "ponerle como sello, muy discretamente, la marca \"ProfEdgarH.\""
  }
};

const APP_MODES = {
  "infografias": {
    appTitle: "Generador de infografías",
    label1: "Tema de la infografía",
    placeholder1: "Ej: El Cambio Climático",
    label2: "Propósito (educar, persuadir, resumir, divulgar)",
    placeholder2: "Ej: educar",
    promptFormat: "diseñar la infografía",
    config: INFOGRAFIA_CONFIG
  },
  "mapas_mentales": {
    appTitle: "Generador de Mapas Mentales",
    label1: "Tema central del mapa",
    placeholder1: "Ej: El Sistema Solar",
    label2: "Nivel académico",
    placeholder2: "Ej: Secundaria",
    promptFormat: "diseñar el mapa mental",
    config: {
      "mapa_mental": {
        "definicion": "Un mapa mental es un diagrama que representa conceptos relacionados a partir de un tema principal o palabra clave, usando ramas, colores e íconos.",
        "estructura": "Jerarquía radial, nodos interconectados, lectura fácil.",
        "estilo": "Espacio limpio, líneas curvas que conectan conceptos, íconos simples y visualmente atractivos."
      }
    }
  },
  "flashcards": {
    appTitle: "Creador de Flashcards",
    label1: "Concepto a memorizar",
    placeholder1: "Ej: La fotosíntesis",
    label2: "Estilo visual",
    placeholder2: "Ej: Metáfora visual o caricatura",
    promptFormat: "diseñar la flashcard de estudio",
    config: {
      "flashcard_estudio": {
        "definicion": "Tarjeta visual para estudio rápido que asocia un concepto complejo con una imagen memorable.",
        "enfoque": "Una imagen central fuerte, texto mínimo, alto contraste para facilitar la retención.",
        "uso": "Ideal para tarjetas mnemotécnicas."
      }
    }
  },
  "posters": {
    appTitle: "Generador de Pósters Académicos",
    label1: "Título de la investigación",
    placeholder1: "Ej: Energía Renovable en 2030",
    label2: "Campo científico",
    placeholder2: "Ej: Física Ambiental",
    promptFormat: "diseñar el póster científico",
    config: {
      "poster_cientifico": {
        "definicion": "Póster de formato académico para presentar información estructurada.",
        "estructura": "Introducción, Metodología, Resultados, Conclusiones.",
        "estilo": "Sobrio, formal, universitario, uso de gráficos abstractos o esquemas de datos."
      }
    }
  },
  "cuentos": {
    appTitle: "Ilustrador de Cuentos",
    label1: "Escena o personaje principal",
    placeholder1: "Ej: Un dragón leyendo un libro",
    label2: "Estilo de ilustración",
    placeholder2: "Ej: Acuarela infantil, Pixar 3D",
    promptFormat: "diseñar la ilustración del cuento",
    config: {
      "ilustracion_cuento": {
        "definicion": "Ilustración narrativa diseñada para acompañar un cuento infantil o historia educativa.",
        "foco": "Emociones de los personajes, colores cautivadores, iluminación de fantasía, consistencia artística."
      }
    }
  },
  "diplomas": {
    appTitle: "Diseñador de Diplomas",
    label1: "Nombre del logro o curso",
    placeholder1: "Ej: Graduación en Robótica",
    label2: "Tono del evento",
    placeholder2: "Ej: Formal, Tecnológico, Divertido",
    promptFormat: "diseñar el diploma o certificado",
    config: {
      "diploma_certificado": {
        "definicion": "Documento de certificación o logro visual.",
        "elementos": "Marcos ornamentales, escudos o sellos de aprobación, espacio para firma, tipografía elegante (script o serif clásica)."
      }
    }
  },
  "cheatsheets": {
    appTitle: "Generador de Cheat Sheets",
    label1: "Tema técnico a resumir",
    placeholder1: "Ej: Fórmulas de Física Clásica",
    label2: "Enfoque visual",
    placeholder2: "Ej: Minimalista, Cyberpunk, Esquema",
    promptFormat: "diseñar la hoja de trucos (cheat sheet)",
    config: {
      "cheat_sheet": {
        "definicion": "Hoja de referencia visual (resumen) que agrupa información clave en cajas y esquemas.",
        "estilo": "Alta densidad de información pero muy bien organizada, tipografía monoespaciada o muy clara, colores para categorizar bloques."
      }
    }
  },
  "comics": {
    appTitle: "Creador de Cómics Educativos",
    label1: "Concepto a explicar en el cómic",
    placeholder1: "Ej: El ciclo del agua",
    label2: "Personaje principal",
    placeholder2: "Ej: Una gota de agua animada",
    promptFormat: "diseñar una página de cómic",
    config: {
      "comic_educativo": {
        "definicion": "Página de cómic dividida en múltiples paneles para explicar una situación secuencialmente.",
        "estructura": "Múltiples viñetas, globos de texto simulados, estética pop-art o dibujo lineal americano, narrativa visual clara."
      }
    }
  }
};

let currentAppMode = "infografias";

function changeAppMode() {
    const selector = document.getElementById('app_mode');
    if (!selector) return;
    currentAppMode = selector.value;
    const modeData = APP_MODES[currentAppMode];
    
    // Update DOM elements
    const tabTitle = document.getElementById('app_tab_title');
    if (tabTitle) tabTitle.textContent = modeData.appTitle;
    
    const mainTitle = document.getElementById('app_main_title');
    if (mainTitle) mainTitle.textContent = modeData.appTitle;
    
    const label1 = document.getElementById('label_input1');
    if (label1) label1.textContent = modeData.label1;
    
    const input1 = document.getElementById('revista_nombre');
    if (input1) input1.placeholder = modeData.placeholder1;
    
    const label2 = document.getElementById('label_input2');
    if (label2) label2.textContent = modeData.label2;
    
    const input2 = document.getElementById('editorial_input');
    if (input2) input2.placeholder = modeData.placeholder2;
    
    updatePromptsForSelection();
}

// When object or emotion changes, update prompts automatically
function updatePromptsForSelection() {
    const sel = document.getElementById('object_select');
    if (!sel) return;
    const selected = sel.value || 'page_1'; // e.g., 'page_1'
    const template = TEMPLATES[selected] || null;
    // build system prompt using template and inputs
    const input1Value = (document.getElementById('revista_nombre') && document.getElementById('revista_nombre').value.trim()) || '';
    const input2Value = (document.getElementById('editorial_input') && document.getElementById('editorial_input').value.trim()) || '';
    
    const modeData = APP_MODES[currentAppMode] || APP_MODES["infografias"];
    const tplText = templateToPrompt(template);
    
    let systemPrompt = `Usa esta plantilla para ${modeData.promptFormat}: ${tplText}\n`;
    systemPrompt += `Configuración obligatoria:\n${JSON.stringify(modeData.config, null, 2)}\n`;
    if (input1Value) systemPrompt += ` ${modeData.label1} debe ser: "${input1Value}".`;
    if (input2Value) systemPrompt += ` ${modeData.label2} es: "${input2Value}".`;
    systemPrompt += `\nIMPORTANTE: En todas las generaciones, ponle como sello o firma, muy discretamente, la marca "ProfEdgarH.".`;
    // also include the raw JSON of the template to ensure styles are applied
    if (template) {
        try {
            const raw = JSON.stringify(template, null, 2);
            systemPrompt += ` e incluye:\n${raw}`;
        } catch (e) {
            // fallback to textual tplText already present
        }
    }
        // put into editable textarea (if exists) and expose globally
        const spArea = document.getElementById('system_prompt');
        if (spArea) {
            spArea.value = systemPrompt;
            window._systemPrompt = spArea.value;
        } else {
            window._systemPrompt = systemPrompt;
        }
        // show notice briefly
        const notice = document.getElementById('system_notice');
        if (notice) { notice.style.display = 'block'; notice.textContent = 'System prompt actualizado: ' + (systemPrompt.length>120? systemPrompt.slice(0,120)+'...': systemPrompt); setTimeout(()=>{ notice.style.display='none'; }, 4000); }
}

async function fetchAndPopulateModels() {
    // minimal implementation: try fetch remote models, else leave empty
    try {
        const resp = await fetch(MODELS_URL);
        const models = await resp.json();
        const sel = document.getElementById('img_model');
        sel.innerHTML = '';
        models.forEach(m=>{
            if (m.output_modalities && m.output_modalities.includes('image')) {
                const o = new Option(m.description || m.name, m.name);
                sel.add(o);
            }
        });
    } catch (e) {
        // fallback models
        const sel = document.getElementById('img_model');
        sel.innerHTML = '';
        ['flux','kontext','veo'].forEach(n=> sel.add(new Option(n,n)));
    }
}

function buildSystemPrompt() {
    // Build system prompt from currently selected plantilla and inputs
    updatePromptsForSelection();
}
            // Override populateObjectSelect to ensure 'personalizado' option is present
            function populateObjectSelect(list) {
                const sel = document.getElementById('object_select');
                if (!sel) return;
                sel.innerHTML = '';
                const items = (list || []).slice(0,50);
                items.forEach((it, idx) => {
                    const opt = document.createElement('option');
                    opt.value = it;
                    opt.textContent = `${(idx+1).toString().padStart(2,'0')}. ${it}`;
                    sel.appendChild(opt);
                });
                // add personalizado option at end
                const customOpt = document.createElement('option');
                customOpt.value = 'personalizado';
                customOpt.textContent = `${(items.length+1).toString().padStart(2,'0')}. personalizado`;
                sel.appendChild(customOpt);

                // ensure custom input reacts
                const cust = document.getElementById('custom_object_input');
                if (cust) {
                    cust.style.display = 'none';
                    cust.removeEventListener('input', updatePromptsForSelection);
                    cust.addEventListener('input', updatePromptsForSelection);
                }
            }

function saveKeyLocally(){ const k = document.getElementById('apiKeyInput').value.trim(); if(k) localStorage.setItem('pollinations_api_key', k); }
function saveKeyLocally(){ const k = document.getElementById('apiKeyInput').value.trim(); if(k) { localStorage.setItem('pollinations_api_key', k); renderTemplateThumbnails(); } }
function startAuthFlow(){ const redirectUrl = window.location.href.split('#')[0]; window.location.href = `https://enter.pollinations.ai/authorize?redirect_url=${encodeURIComponent(redirectUrl)}`; }

function getApiKey(){ return document.getElementById('apiKeyInput').value.trim(); }

function getImageDims() {
    const sel = document.getElementById('img_ratio');
    const val = sel ? sel.value : 'vertical';
    if (val === 'square') return 'width=1024&height=1024';
    if (val === '4:3') return 'width=1024&height=768';
    if (val === '3:4') return 'width=768&height=1024';
    // vertical (9:16) fallback
    return 'width=1152&height=2048';
}

function generateImageFromPrompt() {
    const key = getApiKey();
    if (!key) return alert('Por favor ingresa tu API key.');
    const prompt = window._systemPrompt || '';
    if (!prompt) return alert('System prompt vacío. Selecciona una plantilla y completa los campos.');
    const model = document.getElementById('img_model') ? document.getElementById('img_model').value : 'flux';
    const seed = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    const url = `${GENERATE_URL}${encodeURIComponent(prompt)}?key=${key}&model=${model}&${getImageDims()}&seed=${seed}`;
    const img = document.getElementById('img-preview');
    // show transient loading message
    const loading = document.getElementById('img_loading');
    if (loading) loading.style.display = 'block';
    img.style.display = 'block';
    img.onload = () => { if (loading) loading.style.display = 'none'; };
    img.src = url;
}

// Update preview container size according to ratio selection
function updateBoxSize() {
    const sel = document.getElementById('img_ratio');
    const val = sel ? sel.value : 'vertical';
    const box = document.getElementById('img-container');
    let w = 420, h = 745;
    if (val === 'square') { w = 420; h = 420; }
    else if (val === '4:3') { w = 640; h = 480; }
    else if (val === '3:4') { w = 480; h = 640; }
    else { w = 420; h = 745; }
    if (box) { box.style.width = w + 'px'; box.style.height = h + 'px'; }
}

// Download current image displayed in preview
async function downloadCurrentImage() {
    const url = document.getElementById('img-preview').src;
    if (!url) return alert('No hay imagen para descargar.');
    try {
        const resp = await fetch(url);
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `objeto_parlante_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        window.open(url, '_blank');
    }
}

// Ensure API key helpers exist
function saveKeyLocally(){
    const el = document.getElementById('apiKeyInput');
    if (!el) return;
    const k = el.value.trim();
    if (k) localStorage.setItem('pollinations_api_key', k);
    // regenerate thumbnails when key available
    try { renderTemplateThumbnails(); } catch(e){}
}

function getApiKey(){
    const el = document.getElementById('apiKeyInput');
    return el ? el.value.trim() : '';
}

// Copy the current system prompt to clipboard (with fallback)
function copySystemPrompt() {
    const spEl = document.getElementById('system_prompt');
    const btn = document.getElementById('copyPromptBtn');
    const text = (spEl && spEl.value) ? spEl.value : (window._systemPrompt || '');
    if (!text) return alert('System prompt vacío.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            if (btn) {
                const prev = btn.textContent;
                btn.textContent = 'Copiado';
                setTimeout(() => { btn.textContent = prev; }, 1200);
            }
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        alert('System prompt copiado');
    } catch (e) {
        alert('No fue posible copiar automáticamente. Selecciona y copia manualmente.');
    }
    document.body.removeChild(ta);
}

// Language toggle for the prompt area
function setPromptToSpanish() {
    currentLang = 'es';
    // update prompt according to current selection and inputs
    updatePromptsForSelection();
}

function setPromptToEnglish() {
    currentLang = 'en';
    updatePromptsForSelection();
}

// Attach new controls
document.addEventListener('DOMContentLoaded', () => {
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyPromptBtn');
    if (btnEs) btnEs.onclick = setPromptToSpanish;
    if (btnEn) btnEn.onclick = setPromptToEnglish;
    if (downloadBtn) downloadBtn.onclick = downloadCurrentImage;
    if (copyBtn) copyBtn.onclick = copySystemPrompt;
    const ratio = document.getElementById('img_ratio');
    if (ratio) { ratio.addEventListener('change', updateBoxSize); }
    // initialize size
    updateBoxSize();
});

// Bind plantilla and inputs and system prompt edits
document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('object_select');
    if (sel) sel.addEventListener('change', updatePromptsForSelection);
    const rev = document.getElementById('revista_nombre');
    const edi = document.getElementById('editorial_input');
    const sp = document.getElementById('system_prompt');
    if (rev) rev.addEventListener('input', updatePromptsForSelection);
    if (edi) edi.addEventListener('input', updatePromptsForSelection);
    if (sp) sp.addEventListener('input', ()=>{ window._systemPrompt = sp.value; });
    // initial fill
    setTimeout(()=>{ try{ updatePromptsForSelection(); }catch(e){} }, 100);
});

// Additional initialization to ensure selector is populated and system prompt generated by default
document.addEventListener('DOMContentLoaded', () => {
    if (!currentObjectsEnglish || currentObjectsEnglish.length === 0) {
        currentObjectsEnglish = FALLBACK_OBJECTS.slice(0,50);
        currentObjectsSpanish = currentObjectsEnglish.map(e => TRANSLATIONS_ES[e] || e);
    }
    populateObjectSelect(currentLang === 'es' ? currentObjectsSpanish : currentObjectsEnglish);
    // hide PDF and gen prompt buttons (redundant safety)
    const loadBtn = document.getElementById('loadPdfBtn'); if (loadBtn) loadBtn.style.display = 'none';
    const genBtn = document.getElementById('genPromptBtn'); if (genBtn) genBtn.style.display = 'none';
    // bind actions
    const pdfBtn = document.getElementById('loadPdfBtn'); if (pdfBtn) pdfBtn.onclick = loadPdfObjects;
    const gBtn = document.getElementById('genImageBtn'); if (gBtn) gBtn.onclick = () => { const loading = document.getElementById('img_loading'); if (loading) loading.style.display = 'block'; generateImageFromPrompt(); };
    const esBtn = document.getElementById('btnEs'); if (esBtn) esBtn.onclick = () => { setPromptToSpanish(); updatePromptsForSelection(); };
    const enBtn = document.getElementById('btnEn'); if (enBtn) enBtn.onclick = () => { setPromptToEnglish(); updatePromptsForSelection(); };
    const downBtn = document.getElementById('downloadBtn'); if (downBtn) downBtn.onclick = downloadCurrentImage;
    // bind selection changes
    const objSel = document.getElementById('object_select'); if (objSel) objSel.addEventListener('change', updatePromptsForSelection);
    const emotionSel = document.getElementById('emotion_select'); if (emotionSel) emotionSel.addEventListener('change', updatePromptsForSelection);

    updateBoxSize();
    // generate system prompt by default and ensure prompts reflect first selection
    buildSystemPrompt();
    updatePromptsForSelection();
    // try fetch models
    if (typeof fetchAndPopulateModels === 'function') fetchAndPopulateModels();
});

