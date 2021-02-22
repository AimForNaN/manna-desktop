export default class Bookmarker {
    constructor({ Vue, Paths }) {
        this.Bookmarks = new Set();
    }

    addBookmark(b) {
        this.Bookmarks.add(b);
    }

    get is() {
        return 'Bookmarker';
    }

    onBookmark(parent) {
        var {
            Book,
            Chapter,
            Verse,
        } = parent;
        var bookmark = `${Book}.${Chapter}.${Verse}`;
        console.log(bookmark);
    }

    get Type() {
        return [
            'Verse',
        ];
    }

    get VerseMenu() {
        return {
            Action: this.onBookmark,
            Label: 'Bookmark Verse',
            Icon: 'bookmark-plus',
        };
    }
}
