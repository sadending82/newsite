"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { japaneseFont } from "@/components/fonts"
import type { JSX } from "react/jsx-runtime"

interface FAQItem {
    id: number
    question: string
    answer: JSX.Element
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "写真がロードされません。",
        answer:  (
            <div className = "sapce-y-4">
                <p>先ず、しばらくロードを待ってください。</p>
                &nbsp;
                <p>このサイトは多くの写真の管理のために外部にサーバーをおいています。</p>
                <p>そのサーバーは常にOnの状態ではなく、写真の要請がある場合起動し始めます。</p>
                <p>その故に最初の写真だけロードの時間が長くなる場合があります。</p>
                &nbsp;
                <p>上の状況ではない場合はContactに書いてある連絡先にご報告いただけるとなるべく早めに措置いたします。</p>
            </div>
            ),
    },
    {
        id: 2,
        question: "写真のアップロードはいつ行われますか？",
        answer: (
            <div className = "sapce-y-4">
            <p>サイト主が時間が空いた時にランダムにアップロードいたします。</p>
            &nbsp;
            <p>基本的には一週間に一回はアップロードするつもりですが、</p>
            <p>大型アップデートや一身上の都合などがある場合はアップロードされない場合もあります。</p>
            </div>
        ),
    }
]

function FAQAccordion({ item }: { item: FAQItem}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="px-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                    <h3 className={`text-lgtext-gray-900 pr-4 font-semibold ${japaneseFont.className}`}>{item.question}</h3>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="px-10 py-8 bg-gray-50 border-t border-gray-200">
                                {item.answer}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default function FAQPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
                </div>
            </div>

            <div className="space-y-4">
                {faqData.map((item) => (
                    <FAQAccordion key={item.id} item={item} />
                ))}
            </div>

            <div className="mt-12 text-center px-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${japaneseFont.className}`}>まだ解決できてないでしょうか？</h2>
                    <p className={`text-gray-600 mb-6 ${japaneseFont.className}`}>気楽にDMください！</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                    >
                        連絡先
                    </a>
                </div>
            </div>
        </div>
    )
}