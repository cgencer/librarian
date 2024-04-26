//TODO: Feature: childs of ContentController & Routes for Post, Product, Game, ...
//TODO: Feature: Generic Properties for the Content types
//TODO: GraphQL beside RestAPI




// CHEF: IPTables: https://superuser.com/questions/541307/how-to-configure-a-firewall-on-centos-using-vagrant-and-chef

HTTP_PORT=$(VBoxManage showvminfo $(cat .vagrant/machines/default/virtualbox/id) --details --machinereadable|egrep '^Forwarding\([0-9]+\)\=\"(.+),,80\"$'|cut -d, -f4)


https://www.digitalocean.com/community/tutorials/how-to-implement-a-basic-firewall-template-with-iptables-on-ubuntu-20-04#creating-the-jump-rules-to-the-protocol-specific-chains
