# Boolparser

Resolve boolean expressions to a true/false result.
Primarily used as the basis for a more comprehensive version of mutlisig.

eg.
    "2 of 3 mutlisig" would be replaced with
    "t1 + t2 + t3 > 1"   (where t1-3 are trustee signers, and get replaced with either a 0 or 1)


See bool_test.go for more examples.