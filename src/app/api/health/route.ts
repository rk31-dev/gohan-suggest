import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  const envStatus = {
    NOTION_API_KEY: apiKey ? `設定済み (${apiKey.substring(0, 10)}...)` : '未設定',
    NOTION_DATABASE_ID: databaseId ? `設定済み (${databaseId})` : '未設定',
  };

  let notionStatus = '未テスト';
  let shopCount = 0;
  let errorMessage: string | null = null;

  if (apiKey && databaseId) {
    try {
      const response = await fetch('https://api.notion.com/v1/databases/' + databaseId + '/query', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({ page_size: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        notionStatus = '接続成功';
        shopCount = data.results?.length || 0;
      } else {
        const errorData = await response.json();
        notionStatus = '接続失敗';
        errorMessage = errorData.message || `HTTP ${response.status}`;
      }
    } catch (error: any) {
      notionStatus = 'エラー';
      errorMessage = error.message;
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: envStatus,
    notion: {
      status: notionStatus,
      shopCount,
      error: errorMessage,
    },
  });
}
