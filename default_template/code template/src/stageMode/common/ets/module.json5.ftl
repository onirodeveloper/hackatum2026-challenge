{
  "module": {
    "abilities": [
      {
        "name": "${abilityName}",
        "srcEntry": "./ets/${abilityName?lower_case}/${abilityName}.${abilityFileNameExt}",
        "description": "$string:${abilityName}_desc",
        <#if (compatibleBaseApi?? && compatibleBaseApi gte 11)>
          "icon": "$media:layered_image",
        <#else>
          "icon": "$media:icon",
        </#if>
        "label": "$string:${abilityName}_label",
        "startWindowIcon" : "$media:startIcon",
        "startWindowBackground" : "$color:start_window_background"
        <#if visible>
          ,
        "exported": true
        </#if>
        <#if hasSkill>
          ,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "ohos.want.action.home"
            ]
          }
        ]
        </#if>
      }
    ]
  }
}
