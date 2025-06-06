"use client"

import { japaneseFont } from "@/components/fonts";

type LogItem = {
    date: string;
    icon: string;
    message: string;
}

const updates = [
    "[2025-06-06] ✨ FAQページを追加しました。",
    "[2025-06-06] ♻️ 小型画面でのこのサイトのグラフィックが可笑しかった部分を修正しました。",
    "[2025-06-04] 🚀 変更した項目を反映しました。",
    "[2025-06-04] 🐛 サーバーサイドが写真を管理するようになって、背景が変わらなくなりました...",    
    "[2025-06-04] ✨ サーバーとウェブサイトを繋げました。これからサーバーで写真を管理します。",
    "[2025-06-03] ✨ クラウドストレージに接続するサーバーを用意しました。これからお金かかる...",
    "[2025-06-03] ✨ 画像管理用のクラウドストレージを用意しました。",
    "[2025-06-03] 💡 画像の数が増えてきたので、ウェブサイト側で管理しきれない事を認知しました。",
    "[2025-06-03] ✨ 画像の数が増えてきたので、月ごとに分類する機能を追加しました。",
    "[2025-06-03] ♻️ 下のペイジー表示の位置を修正しました。",
    "[2025-06-02] 🚀 変更した項目を反映しました。",
    "[2025-06-02] ✨ キャストのカテゴリーの表示を名前順に変えました。",
    "[2025-06-01] ✨ キャストの人数が増え探しづらくなったカテゴリー選択をサイドバー形式に変更しました。",
    "[2025-05-07] 🚀 変更した項目を反映しました。",     
    "[2025-05-07] ✨ 4月30日分の写真をアップロードしました。",
    "[2025-04-27] 🚀 変更した項目を反映しました。",    
    "[2025-04-27] ✨ 4月16日、4月23日分の写真をアップロードしました。",
    "[2025-04-27] ♻️ Contactページを外見をほんのちょっとだけ修正しました。",
    "[2025-04-27] ✨ 一部の日本語のフォントを変えてみました。（Rounded M+）",
    "[2025-04-26] ✨ Contactページで、メールアドレスをコピーできるようにしました。",
    "[2025-04-26] ✨ アップデートログを追加しました。",
]

const iconColorMap: Record<string, string> = {
    "✨": "text-yellow-800", // New Thing 
    "🐛": "text-red-800", // Bug
    "♻️": "text-blue-800", // Code Refactoring
    "🚀": "text-green-800", // Deploy
    "💡": "text-black-800", // New Idia
};

function parseLog(log: string): LogItem | null {
    const match = log.match(/^\[(.*?)\]\s(.*?)\s(.*)$/);
    if (!match) return null;
    const [, date, icon, message] = match;
    return {date, icon, message};
}

export default function UpdateLog() {

    const logs = updates.map(parseLog).filter(Boolean) as LogItem[];

    return (
        <div className={`bg-gray-300
         text-black p-4 font-bold text-sm rounded-md overflow-x-auto ${japaneseFont.className}`}>
          {
            logs.map((log, idx) => (
                <div key={idx} className="text-left text-lg whitespace-pre-wrap leading-relaxed py-2">
                    <span className="w-100">-&gt;  </span>
                    <span className="w-100">&#91;{log.date}&#93;</span>
                    <span className="w-40"> {log.icon} : </span>
                    <span className={`shrink-0 ${iconColorMap[log.icon] ?? "text-white"} flex-1`}>{log.message}</span>
                </div>
            ))
          }
          </div>
    );
}