<?xml version="1.0"?>
<command>
    <#if action == "ohosCreateProject">
        <copy src="AGENTS.md" dest="${projectOut}/AGENTS.md"/>
        <copy src="CLAUDE.md" dest="${projectOut}/CLAUDE.md"/>
        <copy src="GEMINI.md" dest="${projectOut}/GEMINI.md"/>
        <copy src="hackathon-resources" dest="${projectOut}/hackathon-resources"/>
        <copy src="project scaffolds/AI_WORKFLOW.md" dest="${projectOut}/AI_WORKFLOW.md"/>
        <copy src="project scaffolds/HACKATHON_BRIEF.md" dest="${projectOut}/HACKATHON_BRIEF.md"/>
    </#if>
    <#include "commands/stringCommand.xml.ftl"/>
    <merge src="code template/res/element/color.json.ftl" dest="${rootOut}/src/main/resources/base/element/color.json"/>
    <merge src="code template/res/element/float.json.ftl" dest="${rootOut}/src/main/resources/base/element/float.json"/>
    <#if apiType == "stageMode">
        <#if (projectType?? && projectType == "Application") || (atomicService?? && !atomicService)>
            <#if (compatibleBaseApi?? && compatibleBaseApi gte 11)>
                <copy src="code template/res/media/background.png" dest="${rootOut}/src/main/resources/base/media/background.png"/>
                <copy src="code template/res/media/foreground.png" dest="${rootOut}/src/main/resources/base/media/foreground.png"/>
                <copy src="code template/res/media/layered_image.json" dest="${rootOut}/src/main/resources/base/media/layered_image.json"/>
            <#else>
                <copy src="code template/res/media/icon_app.png" dest="${rootOut}/src/main/resources/base/media/icon.png"/>
            </#if>
        <#else>
            <copy src="code template/res/media/icon.png" dest="${rootOut}/src/main/resources/base/media/icon.png"/>
        </#if>
    <#else>
        <copy src="code template/res/media/icon_fa.png" dest="${rootOut}/src/main/resources/base/media/icon.png"/>
    </#if>
    <#if action == "ohosCreateAbility">
    <#-- 创建ability   -->
        <#include "commands/createAbilityCommand.xml.ftl" />
    <#else>
    <#-- 创建模块/工程  -->
        <#--  res  -->
        <mkdir dest="${rootOut}/src/main/resources/rawfile"/>
        <#if apiType == "stageMode">
            <#include "commands/stageCommand.xml.ftl"/>
        <#else>
            <#include "commands/faCommand.xml.ftl"/>
        </#if>
    </#if>
</command>
