# Generates a branded 1200x630 social-share card from a couple photo.
#   Source : public/couple-photo.jpg   (you provide this)
#   Output : public/og-image.jpg
# Run:  powershell -ExecutionPolicy Bypass -File scripts/make-og-image.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root 'public/couple-photo.jpg'
$out  = Join-Path $root 'public/og-image.jpg'

if (-not (Test-Path $src)) {
  Write-Error 'Missing public/couple-photo.jpg - save your photo there first.'
  exit 1
}

$W = 1200; $H = 630
$photoW = 520
$panelX = $photoW
$panelCx = [int]($panelX + ($W - $panelX) / 2)

# palette
$ivory = [System.Drawing.Color]::FromArgb(244,236,219)
$burg  = [System.Drawing.Color]::FromArgb(107,11,10)
$burg2 = [System.Drawing.Color]::FromArgb(140,29,38)
$gold  = [System.Drawing.Color]::FromArgb(182,109,31)
$brown = [System.Drawing.Color]::FromArgb(140,74,63)
$muted = [System.Drawing.Color]::FromArgb(176,143,106)

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$g.FillRectangle((New-Object System.Drawing.SolidBrush($ivory)), 0, 0, $W, $H)

# left photo (cover-crop into the column)
$photo = [System.Drawing.Image]::FromFile($src)
$scale = [Math]::Max($photoW / $photo.Width, $H / $photo.Height)
$dw = [int]($photo.Width * $scale); $dh = [int]($photo.Height * $scale)
$dx = [int](($photoW - $dw) / 2);   $dy = [int](($H - $dh) / 2)
$g.SetClip((New-Object System.Drawing.Rectangle(0, 0, $photoW, $H)))
$g.DrawImage($photo, $dx, $dy, $dw, $dh)
$g.ResetClip()
$photo.Dispose()

# shadow + gold divider between photo and panel
$g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40,0,0,0))), $photoW, 0, 16, $H)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($gold)), $photoW, 0, 5, $H)

# helpers
$center = New-Object System.Drawing.StringFormat
$center.Alignment = [System.Drawing.StringAlignment]::Center

function Draw-Centered([string]$text, [System.Drawing.Font]$font, [System.Drawing.Color]$color, [int]$y) {
  $brush = New-Object System.Drawing.SolidBrush($color)
  $rect  = New-Object System.Drawing.RectangleF($panelX, $y, ($W - $panelX), 120)
  $script:g.DrawString($text, $font, $brush, $rect, $script:center)
  $brush.Dispose()
}
function Spaced([string]$s) { ($s.ToCharArray() -join ' ') }

# text
$f_eyebrow = New-Object System.Drawing.Font('Georgia', 12, [System.Drawing.FontStyle]::Regular)
Draw-Centered (Spaced 'YOU ARE CORDIALLY INVITED') $f_eyebrow $brown 96

$amp = [string][char]38
$names = 'Nawal ' + $amp + ' Hassan'
$sizeN = 54
do {
  $f_names = New-Object System.Drawing.Font('Georgia', $sizeN, [System.Drawing.FontStyle]::Bold)
  $m = $g.MeasureString($names, $f_names)
  if ($m.Width -le ($W - $panelX - 60)) { break }
  $sizeN -= 2
} while ($sizeN -gt 28)
Draw-Centered $names $f_names $burg 140

# divider with diamond
$lineY = 235
$gb = New-Object System.Drawing.SolidBrush($gold)
$g.FillRectangle($gb, ($panelCx - 110), $lineY, 80, 2)
$g.FillRectangle($gb, ($panelCx + 30),  $lineY, 80, 2)
$st = $g.Save()
$g.TranslateTransform($panelCx, ($lineY + 1)); $g.RotateTransform(45)
$g.FillRectangle($gb, -6, -6, 12, 12)
$g.Restore($st)

$f_date = New-Object System.Drawing.Font('Georgia', 30, [System.Drawing.FontStyle]::Regular)
Draw-Centered '07 . 08 . 2026' $f_date $burg2 268

$f_loc = New-Object System.Drawing.Font('Georgia', 13, [System.Drawing.FontStyle]::Regular)
Draw-Centered (Spaced 'VENGARA, KERALA') $f_loc $brown 330

$f_foot = New-Object System.Drawing.Font('Georgia', 12, [System.Drawing.FontStyle]::Regular)
Draw-Centered (Spaced 'WEDDING INVITATION') $f_foot $muted 548

# border frames
$penB = New-Object System.Drawing.Pen($burg, 3); $g.DrawRectangle($penB, 16, 16, ($W-32), ($H-32))
$penG = New-Object System.Drawing.Pen($gold, 1); $g.DrawRectangle($penG, 24, 24, ($W-48), ($H-48))

# save high-quality JPEG
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep  = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$bmp.Save($out, $enc, $ep)

$g.Dispose(); $bmp.Dispose()
Write-Output ('Created ' + $out)
