import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, Container, Title, Text, Code } from "@mantine/core";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Container p="md">
                    <Alert variant="filled" color="red" title="Something went wrong">
                        <Title order={4}>Application Crashed</Title>
                        <Text size="sm" mt="sm">The following error occurred:</Text>
                        <Code block mt="xs">
                            {this.state.error?.toString()}
                        </Code>
                        <Text size="sm" mt="md">
                            Please try restarting the app or check the console for more details.
                        </Text>
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}
