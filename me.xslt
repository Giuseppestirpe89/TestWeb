<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
  <body>
  <h2>My Games Collection</h2>
  <table border="2" padding="10px">
    <tr bgcolor="#9acd32">
      <th width="150">Title</th>
      <th width="150">Price</th>
    </tr>
    <xsl:for-each select="catalog/games">
    <tr>
      <td ><xsl:value-of select="title"/></td>
      <td><xsl:value-of select="price"/></td>
    </tr>
    </xsl:for-each>
  </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>