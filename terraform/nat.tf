resource "aws_eip" "nat_1" {
  vpc      = true
}

resource "aws_nat_gateway" "nat_1" {
  allocation_id = "${aws_eip.nat_1.id}"
  subnet_id = "${aws_subnet.public_1.id}"
}

resource "aws_eip" "nat_2" {
  vpc      = true
}

resource "aws_nat_gateway" "nat_2" {
  allocation_id = "${aws_eip.nat_2.id}"
  subnet_id = "${aws_subnet.public_2.id}"
}
resource "aws_eip" "nat_3" {
  vpc      = true
}

resource "aws_nat_gateway" "nat_3" {
  allocation_id = "${aws_eip.nat_3.id}"
  subnet_id = "${aws_subnet.public_3.id}"
}

