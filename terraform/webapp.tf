resource "aws_autoscaling_group" "webapp" {
  availability_zones = ["${var.az1}","${var.az2}","${var.az3}"]
  vpc_zone_identifier = ["${aws_subnet.private_1.id}","${aws_subnet.private_2.id}","${aws_subnet.private_3.id}"]
  name = "Webapp"
  min_size = 1
  desired_capacity=5
  max_size = 5
  launch_configuration = "${aws_launch_configuration.webapp.id}"

  tag {
    key = "Name"
    value = "Webapp"
    propagate_at_launch = true
  }
}


resource "aws_launch_configuration" "webapp" {
  name = "Webapp"
  image_id = "${lookup(var.ubuntu_1404_amis, var.region)}"
  instance_type = "t2.micro"
  key_name = "${aws_key_pair.ssh_key.key_name}"
  user_data = "${file(\"../provision/webapp/cloud-config\")}"
  security_groups = ["${aws_security_group.vpc.id}"]
  iam_instance_profile = "S3_read"
}
