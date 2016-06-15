resource "aws_instance" "bastion" {
  instance_type = "t2.micro"
  ami = "${lookup(var.ubuntu_1404_amis, var.region)}"
  subnet_id = "${aws_subnet.public_1.id}"

  user_data = "${file(\"../provision/bastion/cloud-config\")}"

  vpc_security_group_ids = ["${aws_security_group.vpc.id}","${aws_security_group.ssh.id}"]
  key_name = "${aws_key_pair.ssh_key.key_name}"

  iam_instance_profile = "S3_read"

  tags = {
    Name = "Bastion 1"
  }
}
