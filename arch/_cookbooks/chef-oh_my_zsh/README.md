# oh_my_zsh

[![Build Status](https://travis-ci.org/lxmx/chef-oh-my-zsh.png?branch=master)](https://travis-ci.org/lxmx/chef-oh-my-zsh)

## Description

This cookbook features:

- A Chef LWRP to install [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) for system users.
- A companion recipe for [user::data_bag](https://github.com/fnichol/chef-user) which adds an oh-my-zsh per user installation option.

## Release

```
stove
```

## Usage

Include `recipe[oh_my_zsh]` in your `run_list` and `oh_my_zsh_user` resource will become available.

The `oh_my_zsh::data_bag` recipe assumes that you're using the `user::data_bag` recipe from the excellent [user cookbook](https://github.com/fnichol/chef-user). It lets you configure oh-my-zsh installation in user specific data_bags, e.g.

```
{
  "id"        : "testman",
  "home"      : "/home/testman"
  ...
  "oh-my-zsh" : { "enabled": true, "theme": "wedisagree", "plugins": ["git", "rvm"] }
}
```

## Requirements

### Platform

This cookbook has been [tested](https://github.com/lxmx/chef-oh-my-zsh/blob/master/.kitchen.yml) with the following OSes:

- ubuntu
- gentoo

### Cookbooks

The cookbook has got the following dependencies:

- [user](https://github.com/fnichol/chef-user)
- [ark](https://github.com/bryanwb/chef-ark/)
- zsh

## Recipes

### default

No-op, does nothing.

### data_bag

Processes `node['users']` and installs oh-my-zsh for the ones whose data_bags enable it, e.g.

```
{
  "id"        : "ranger",
  ...
  "oh-my-zsh" : { "enabled": true }
}
```

## Resources and Providers

### oh_my_zsh_user

#### Actions

| Action | Description                                                            | Default |
| ------ | ---------------------------------------------------------------------- | ------- |
| ensure | Install oh-my-zsh into `~/.oh-my-zsh`, create and populate `~/.zshrc.` | yes     |
| create | Install only if `~/.oh-my-zsh or` `~/.zshrc` is missing.               | no      |

#### Attributes

| Attribute      | Description                                | Default Value               |
| -------------- | ------------------------------------------ | --------------------------- |
| login          | **Name attribute:** The login of the user. | `nil`                       |
| home           | User's home directory.                     | `/home/username or` `/root` |
| theme          | Theme to use                               | `alanpeabody`               |
| plugins        | Plugins to enable                          | `[]`                        |
| case_sensitive | Use case sensitive completion              | `false`                     |
| autocorrect    | Use autocorrection feature                 | `true`                      |
| locale         | set your locale                            | UTF8                        |

#### .zshrc.chef.local / .zshrc.local customziation made easy

**.zshrc.chef.local**

Enables you to deploy additional zsh configuration per user, extending central aliases or whatever you like.
So this file should still be under control of your chef cookbook, but rather optionally include wrapper cookbook extensions of any kind.

This file is loaded per user in the end of the .zshrc file

**.zshrc.local**

This file can be created by the user, if he decides to - this file is not controlled by chef - its for the local user to put his little aliases inside.

#### Example

```ruby
oh_my_zsh_user 'jessie' do
  plugins        %w{git ruby}
  autocorrect    false
  case_sensitive true
end
```

## Tests

You can run the test using kitchen

    chef exec kitchen converge

## Credits

This cookbook is heavily based on https://github.com/lxmx/chef-oh-my-zsh so a lot of credits go to Vasily Mikhaylichenko

## License

Licensed under BSD license.

    http://opensource.org/licenses/BSD-2-Clause
