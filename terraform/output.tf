output "Bastion DNS name" {
    value = "${aws_instance.bastion.public_dns}"
}

output "ELB DNS name" {
    value = "${aws_elb.elb.dns_name}"
}
