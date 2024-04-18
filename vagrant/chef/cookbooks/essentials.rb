node.override['build-essential']['compile_time'] = true

include_recipe "yum"
include_recipe "yum-epel"
include_recipe "build-essential"
include_recipe 'selinux::permissive'

include_recipe "ntp"
include_recipe "git"
include_recipe "imagemagick"

package 'nano'
package 'cronie'