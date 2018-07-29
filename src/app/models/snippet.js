const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(lang, str.trim(), true).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str.trim())}</code></pre>`;
  },
});

const Snippet = (sequelize, DataTypes) => {
  const snippet = sequelize.define('Snippet', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    getterMethods: {
      excerpt() {
        return this.content.length > 120
          ? `${this.content.substring(0, this.content.lastIndexOf(' ', 120))} ...`
          : this.content;
      },
      formattedContent() {
        return md.render(this.content);
      },
    },
  });

  snippet.associate = (models) => {
    snippet.belongsTo(models.Category);
  };

  return snippet;
};

module.exports = Snippet;
