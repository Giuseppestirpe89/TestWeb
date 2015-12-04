<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
      <div class="row ">
          <div class="col-md-4 ">
            <h2 class="text-center"><xsl:value-of select="//sum[1]/gamehead" /></h2>
            <p class="text-justify"> <xsl:value-of select="//sum[1]/gamebody" /></p>
            <a href="#one" class="btn btn-default">Go to Games</a>
					</div>
					<div class="col-md-4">
						<h2 class="text-center"><xsl:value-of select="//sum[2]/gamehead" /></h2>
            <p class="text-justify"> <xsl:value-of select="//sum[2]/gamebody" /></p>
						<a href="#two" class="btn btn-default">Go to Movies </a>
					</div>
					<div class="col-md-4">
						<h2 class="text-center"><xsl:value-of select="//sum[3]/gamehead" /></h2>
            <p class="text-justify"> <xsl:value-of select="//sum[3]/gamebody" /></p>
						<a href="#three" class="btn btn-default">Go to DVDs</a>
					</div>
					<a href="#home">Back to top</a>
			</div>

  </xsl:template>
</xsl:stylesheet>


