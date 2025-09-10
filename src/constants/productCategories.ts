export type CategoryItem =
  | { type: "link"; name: string; link: string; exist?: "on" }
  | { type: "category"; name: "SKINCARE" | "FACE"; id: "SKINCARE" | "FACE" };

export type ProductCategories = {
  skincare: CategoryItem[];
  face: CategoryItem[];
  eye: CategoryItem[];
  rip: CategoryItem[];
  brush: CategoryItem[];
};


export const productCategories: ProductCategories = {
  skincare:[
      {
          type: "link",
          name: "化粧水",
          link: "/products/skincare/lotion",
      },
      {
          type: "link",
          name: "乳液＆クリーム",
          link: "/products/skincare/cream",
          exist: "on",
      },
      {
          type: "category",
          name: "SKINCARE",
          id: "SKINCARE",
      },
      {
          type: "link",
          name: "洗顔＆クレンジング",
          link: "/products/skincare/cleansing",
          exist: "on",
      },
      {
          type: "link",
          name: "美容液",
          link: "/products/skincare/serum",
          exist: "on",
      },
  ],
  face:[
      {
          type: "link",
          name: "ファンデーション",
          link: "/products/face/foundation",
      },
      {
          type: "category",
          name: "FACE",
          id: "FACE",
      },
      {
          type: "link",
          name: "フェイスパウダー",
          link: "/products/face/powder",
      },
      {
          type: "link",
          name: "コンシーラー",
          link: "/products/face/concealer",
      },
      {
          type: "link",
          name: "チーク",
          link: "/products/face/cheek",
      },
      {
          type: "link",
          name: "ハイライト",
          link: "/products/face/highlight",
      },
  ],
  eye:[
      {
          type: "link",
          name: "アイベース",
          link: "/products/eye/base",
      },
      {
          type: "link",
          name: "アイシャドウ",
          link: "/products/eye/shadow",
          exist: "on",
      },
      {
          type: "link",
          name: "アイライナー",
          link: "/products/eye/liner",
      },
      {
          type: "link",
          name: "マスカラ",
          link: "/products/eye/mascara",
          exist: "on",
      },
      {
          type: "link",
          name: "アイブロウ",
          link: "/products/eye/brow",
      },
      {
          type: "link",
          name: "アイラッシュ",
          link: "/products/eye/lash",
      },
      {
          type: "link",
          name: "アイパレット",
          link: "/products/eye/palette",
          exist: "on",
      },
  ],
  rip:[
      {
          type: "link",
          name: "リップスティック",
          link: "/products/rip/stick",
          exist: "on",
      },
      {
          type: "link",
          name: "リップペンシル",
          link: "/products/rip/pencil",
      },
      {
          type: "link",
          name: "リップグロス",
          link: "/products/rip/gloss",
      },
      {
          type: "link",
          name: "リキッドリップ",
          link: "/products/rip/liquid",
      },
      {
          type: "link",
          name: "リップケア",
          link: "/products/rip/care",
      },
      {
          type: "link",
          name: "リップベース",
          link: "/products/rip/base",
      },
  ],
  brush:[
      {
          type: "link",
          name: "アイブラシ",
          link:"/products/brush/eye",
      },
      {
          type: "link",
          name: "フェイスブラシ",
          link:"/products/brush/face",
      },
      {
          type: "link",
          name: "リップブラシ",
          link:"/products/brush/rip",
      },
  ],
}