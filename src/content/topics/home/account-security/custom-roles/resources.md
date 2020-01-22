---
title: "Resources in custom roles"
excerpt: ""
---
## Overview
This topic explains how custom roles use resources.

Almost everything in LaunchDarkly is a resource, including:

* Projects
* Feature flags
* Environments
* Metrics
* Custom roles 

When you change a feature flag's rollout rules, or rename an environment, you are accessing a particular resource. 

## Understanding the resource specifier syntax

LaunchDarkly uses a resource specifier syntax to name resources or collections of resources. This is a precise but flexible categorizing taxonomy that allows you to name any resource in a way that accurately reflects the information structures your organization uses.

The pattern looks like this:
[block:code]
{
  "codes": [
    {
      "code": "resource-type/name;tag1,tag2",
      "language": "text",
      "name": "Resource specifier syntax"
    }
  ]
}
[/block]
The example above shows two tags separated by a comma. Tags are also optional. If you don't need to use any tags, you can omit the semicolon (`;`) and all content following.

In the example below, we create a resource that names all of the projects in an account:
[block:code]
{
  "codes": [
    {
      "code": "proj/*",
      "language": "text",
      "name": "Resource showing all projects"
    }
  ]
}
[/block]

<Callout intent="info">
  <Callout.Title>Syntax supports wildcards</Callout.Title>
   <Callout.Description>The resource syntax accepts globs, so you can name collections of resources with `*`.
You can also name a specific project by ID.</Callout.Description>
</Callout>


In the example below, we name a project by the `default` ID.
[block:code]
{
  "codes": [
    {
      "code": "proj/default",
      "language": "text",
      "name": "Project ID is `default`"
    }
  ]
}
[/block]
You can name sets of resources all the way down to the tag level.

In the example below, we name all projects with the `mobile` tag.
[block:code]
{
  "codes": [
    {
      "code": "proj/*;mobile",
      "language": "text",
      "name": "All projects tagged `mobile`"
    }
  ]
}
[/block]

## Scoping resources

The term **scoping** refers to granting or restricting permissions and access to a resource based on relationships the resource has. Resources can be scoped within parent resources.

For example, metrics are scoped within a project, and feature flags are scoped within a project **and** environment. 

Name scoped resources by using the resource syntax structure depicted below.
[block:code]
{
  "codes": [
    {
      "code": "resource-type/name;tag1,tag2:resource-type/name;tag3,tag4,tag5\n",
      "language": "text",
      "name": "Scoped resources"
    }
  ]
}
[/block]
In the following example, we name all feature flags across all environments:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:flag/*",
      "language": "text",
      "name": "All feature flags"
    }
  ]
}
[/block]
In the example above, `proj/*:`indicates that all named projects will be included in the list of results. `env/*:` indicates that all environments will be included in the list of results. `flag/*:` indicates that all flags will be included in the list of results.

Because of the range of resources referenced in this example, we can say it has very broad scope. 

For a more refined example, we could name all feature flags whose keys start with `ops_`:
[block:code]
{
  "codes": [
    {
      "code": "proj/*:env/*:flag/ops_*",
      "language": "text",
      "name": "All feature flags with keys that begin with `ops_`"
    }
  ]
}
[/block]

## Understanding resource types and scopes

This table lists all available resource types and scopes:
[block:parameters]
{
  "data": {
    "0-0": "`proj`",
    "1-0": "`env`",
    "2-0": "`metric`",
    "3-0": "`member`",
    "5-0": "`role`",
    "6-0": "`flag`",
    "8-0": "`segment`",
    "7-0": "`integration`",
    "9-0": "`webhook`",
    "10-0": "`user`",
    "11-0": "`code-reference-repository`",
    "12-0": "`destination`",
    "13-0": "`acct`",
    "0-1": "`proj` is a **top-level resource**. Projects have no parent resource. Write it as `proj/*`.
To learn more, read [Projects](./projects).",
    "1-1": "`env` is a child resources of **projects**. Write it as `proj/*:env/*`.
To learn more, read [Environments](./environments).",
    "h-0": "Resource Type",
    "h-1": "Resource Scope",
    "2-1": "`metric` is a child resource of **projects**. Write it as `proj/*:metric/*`.
To learn more, read [Experimentation introduction](./experimentation).",
    "3-1": "`member` is a **top-level resource**. Write it as  `member/*`.
To learn more, read [Managing teams](./teams).",
    "5-1": "`role` is a **top-level resource**. Write it as `role/*`.
To learn more, read [Configuring custom roles](./custom-roles).",
    "6-1": "`flag` is a child of **both a project and environments**. Write it as `proj/*:env/*:flag/*`.
To learn more, read [Creating a feature flag](./creating-a-feature-flag).",
    "13-1": "`acct` is a unique resource specifier representing modifications to your account itself, such as managing 
 plan. Write it as `acct`.",


    "12-1": "`destination` is a child of **both a project and environments**. Write it as `proj/*:env/*:destination/*`.
To learn more, read [Data Export](./data-export).",
    "11-1": "`code-reference-repository` is a **top-level resource**. Write it as `code-reference-repository/*`
To learn more, read [Git code references](./git-code-references).",
    "7-1": "`integration` is a **top-level resource**. Write it as `integration/*`.
To learn more, read the Integrations section.",
    "8-1": "`segment` is a child of **both a project and environments**. Write it as `proj/*:env/*:segment/*`.
To learn more, read [Building user segments](./segmenting-users).",
    "9-1": "`webhook` is a **top-level resource**. Write it as `webhook/*`.
To learn more, read [Webhooks](./webhooks).",
    "10-1": "`user` is a child of **both a project and environments**. Write it as `proj/*:env/*:user/*`.
To learn more, read [The user dashboard](./the-user-dashboard).",
    "4-0": "`token`",
    "4-1": "`token` is a child resource of **members**.\nWrite it as `member/*:token/*`.
To learn more, read [Personal API access tokens](api-access-tokens)."
  },
  "cols": 2,
  "rows": 14
}
[/block]