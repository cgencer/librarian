#!/usr/bin/env bash
sudo yum -y install httpd curl bower 
sudo chown -R vagrant /home/vagrant/.npm

if [ -n /home/vagrant/.bash_profile ]; then
    cp /vagrant/vagrant-chef/scripts/files/.bash_profile /home/vagrant
    cat /vagrant/vagrant-chef/scripts/files/etc_profile >> /etc/profile
fi

source ~/.profile

systemctl start httpd
systemctl enable httpd

firewall-cmd --permanent --add-service=http
firewall-cmd --reload
