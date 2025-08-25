import java.net.Socket;

public class HardcodedIpDemo {
    private static final String IPV4 = "192.168.10.42";
    private static final String IPV6 = "2001:db8:85a3::8a2e:370:7334";

    public static void main(String[] args) throws Exception {
        try (Socket s1 = new Socket(IPV4, 8443)) {}
        try (Socket s2 = new Socket(IPV6, 9090)) {}
    }
}
