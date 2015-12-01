<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
      <h2 class="text-center"><xsl:value-of select="//gamehead" /></h2>
      <p class="text-justify"> <xsl:value-of select="//gamebody" /></p>
     <a href="#one" class="btn btn-default">Go to Games</a>
  </xsl:template>
</xsl:stylesheet>


