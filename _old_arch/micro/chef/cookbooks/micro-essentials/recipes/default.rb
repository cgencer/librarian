include_recipe "yum"
#include_recipe "yum-epel"
#include_recipe "build-essential::default"
#node.override['build-essential']['compile_time'] = true
#include_recipe 'selinux::permissive'
#include_recipe "ntp"
include_recipe "git"
include_recipe "chef-imagemagick"
#include_recipe "nvm"

package 'build-essential'
package 'nano'
package 'cron'

