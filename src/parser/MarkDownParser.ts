export default class MarkDownParser {
    public Parse(mdText: string): string[] {
        const engSection = this.ExtractSection("eng", mdText);
        const jpSection = this.ExtractSection("jp", mdText);
        const krSection = this.ExtractSection("KR", mdText);

        const engResult = this.ProcessSection(engSection);
        const jpResult = this.ProcessSection(jpSection);
        const krResult = this.ProcessSection(krSection);
        return [engResult, jpResult, krResult];
    }

    private ExtractSection(lang: string, mdText: string): string {    
        const lines = mdText.split(/\r?\n/);
        let startIndex = -1;
        let endIndex = lines.length;
        const marker = `### ${lang.toLowerCase()}`;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().toLowerCase() === marker) {
                startIndex = i;
                break;
            }
        }
        if (startIndex === -1) {
            console.log(`"${marker}" not found.`);
            return "";
        }
        for (let i = startIndex + 1; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (
                trimmed.toLowerCase() === "### kr" ||
                trimmed.toLowerCase() === "### eng" ||
                trimmed.toLowerCase() === "### jp"
            ) {
                endIndex = i;
                break;
            }
        }
        return lines.slice(startIndex + 1, endIndex).join("\n").trim();
    }

    private ProcessSection(sectionText: string): string {
        const lines = sectionText.split(/\r?\n/);
        let startIndex = 0;
        while (startIndex < lines.length && lines[startIndex].trim() === "") {
            startIndex++;
        }
        if (startIndex < lines.length) {
            startIndex++;
        }
        const content = lines.slice(startIndex).join("\n");
        return this.ConvertMarkdownToCustomHtml(content);
    }

    private ConvertMarkdownToCustomHtml(md: string): string {
        let result = md;
        // 굵은 헤더 라인 변환 (노션상에서 h3 + bold)
        result = result.replace(/^###\s*\*\*(.+?)\*\*\s*$/gm, '<b>$1</b>\n');
        // 헤더 라인 변환
        result = result.replace(/^###\s*(.+)\s*$/gm, '<b>$1</b>');
        // 인라인 굵은 글씨 변환
        result = result.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        // 단독으로 있는 --- 라인을 제거
        result = result.replace(/^\s*---\s*$/gm, '');
        // 텍스트의 줄바꿈을 개행문자('\n')로 출력되도록 변환
        result = result.replace(/\n/g, '\\n');
        // 텍스트 맨 앞에 개행문자('\n')가 있는 경우 제거
        if (result.startsWith('\\n')) {
            result = result.substr(2);
        }
        return result.trim();
    }
}