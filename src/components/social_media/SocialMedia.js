import { Utils } from "../../utils/index.js";

const html = `
  <div class="socialmedia">
    <div class="socialmedia__containner">
      <a target="_blank" href="https://github.com/NguyenAnhTuan1912" class="fa fa-github"></a>
      <a target="_blank" href="https://www.facebook.com/tunanguyen19" class="fa fa-facebook"></a>
      <a target="_blank" href="https://www.instagram.com/tunangu.yen" class="fa fa-instagram"></a>
      <a target="_blank" href="https://www.behance.net/tngnguyn55" class="fa fa-behance"></a>
    </div>
  </div>
`;

export function SocialMedia() {
  return Utils.Element.toElement(html);
}