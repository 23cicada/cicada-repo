import { Inter, Lusitana } from "next/font/google"

// 构建时被下载
export const inter = Inter({ subsets: ["latin"] })

export const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] })
