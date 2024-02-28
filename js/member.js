/**
 * LOAD MEMBER DATA
 */
function loadMemberData() {
  const jsonFilePath = "../../json/team-members.json";
  const dropdownLang = document.getElementById("dropdown-lang");
  const breadcrumb = document.getElementById("breadcrumb-name");
  const avatar = document.getElementById("member-avatar");
  const memberName = document.getElementById("member-name");
  const memberRole = document.getElementById("member-role");
  const memberBiography = document.getElementById("member-biographie");
  var urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("m")) {
    window.location.href = "/";
  }

  fetch(jsonFilePath)
    .then((response) => response.json())
    .then((data) => {
      isGerman = window.location.href.includes("/de/");
      isEnglish = window.location.href.includes("/en/");
      const member = data.members.find((member) => member.name === urlParams.get("m"));
      //dropdown Language
      dropdownLang.href = dropdownLang.href + "?m=" + member.name;
      //set heading
      memberName.innerHTML = member.name;
      avatar.src = member.img;
      //set role
      memberRole.innerHTML = member.description;
      //set biography
      memberBiography.innerHTML =
        member.biographie[isGerman ? "de" : isEnglish ? "en" : "fr"];
      //set breadcrumb
      breadcrumb.innerHTML = member.name;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadMemberData();
});
