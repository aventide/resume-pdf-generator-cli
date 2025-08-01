import path from 'node:path';

import type { ReactNode } from 'react';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

const FigtreeBoldFont = path.resolve(__dirname, './assets/fonts/Figtree-Bold.ttf');
const LatoRegularFont = path.resolve(__dirname, './assets/fonts/Lato-Regular.ttf');

const MailIcon = path.resolve(__dirname, './assets/icons/mail.png');
const LocationIcon = path.resolve(__dirname, './assets/icons/map-pin.png');
const PhoneIcon = path.resolve(__dirname, './assets/icons/phone.png');

// disable hyphenation wrapping
Font.registerHyphenationCallback((word) => [word]);
Font.register({ family: "Figtree", src: FigtreeBoldFont });
Font.register({ family: "Lato", src: LatoRegularFont });

const headingFontSize = "10pt";
const bodyFontSize = "9pt";

function Header({
	text
}) {
	const styles = StyleSheet.create({
		header: {
			paddingTop: "16pt",
			paddingBottom: "8pt",
			paddingHorizontal: "12pt",
			flexDirection: "row",
			display: "flex",
		},
		headerLeftSide: {
			flex: 2,
		},
		headerRightSide: {
			flex: 1,
			alignItems: "flex-end",
			justifyContent: "flex-start",
			paddingTop: "8pt",
		},
		title: {
			fontWeight: "bold",
			fontSize: "32pt",
			fontFamily: "Figtree",
		},
		subTitle: {
			fontFamily: "Lato",
			fontSize: "10pt",
			marginTop: "8pt",
		},
	});

	return (
		<View style={styles.header}>
			<View style={styles.headerLeftSide}>
				<Text style={styles.title}>{text.title}</Text>
				<Text style={styles.subTitle}>{text.summary}</Text>
			</View>
			<View style={styles.headerRightSide}>
				<HeaderDetail icon={LocationIcon} text={text.address} />
				<HeaderDetail icon={MailIcon} text={text.email} />
				<HeaderDetail icon={PhoneIcon} text={text.phone} />
			</View>
		</View>
	);
}

function ResumeSection({ title, children }: { title: string, children?: ReactNode }) {
	return (
		<View style={{ paddingTop: "12pt", flexDirection: "row" }}>
			<View style={{ marginHorizontal: "16pt", width: "100%" }}>
				<Text
					style={{
						fontFamily: "Figtree",
						textTransform: "uppercase",
						fontSize: "12pt",
					}}
				>
					{title}
				</Text>
				<View
					style={{
						height: "1.5pt",
						backgroundColor: "#000000",
						marginTop: "2pt",
						marginBottom: "4pt",
					}}
				/>
				<View style={{ marginTop: "4pt" }}>{children}</View>
			</View>
		</View>
	);
}

function HeaderDetail({ text, icon }) {
	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Image
				src={icon}
				style={{ height: headingFontSize, marginRight: "6pt" }}
			/>
			<Text
				style={{
					fontSize: headingFontSize,
					marginVertical: "1pt",
					fontFamily: "Lato",
				}}
			>
				{text}
			</Text>
		</View>
	);
}

function Job({ company, text, ...rest }) {
	const companyKey = text.jobs[company];
	const { employer, jobTitle, timeWithMonth, bullets } = companyKey;

	return (
		<ResumeEntry
			label={employer}
			sublabel={jobTitle}
			time={timeWithMonth}
			{...rest}
		>
			<View style={{ flexDirection: "column" }}>
				{bullets.map((bullet: string, index) => (
					<View
						style={{ flexDirection: "row", fontSize: bodyFontSize }}
						key={`bullet-${index}`}
					>
						<Text style={{ marginHorizontal: 4, fontSize: bodyFontSize }}>
							•
						</Text>
						<Text
							style={{
								fontSize: bodyFontSize,
								fontFamily: "Lato",
								marginBottom: "4pt",
								maxWidth: "97%",
							}}
						>
							{bullet}
						</Text>
					</View>
				))}
			</View>
		</ResumeEntry>
	);
}

function ResumeEntry({ children, label, sublabel, time }: {
	children?: ReactNode,
	label: string,
	sublabel: string,
	time: string
}) {
	const resumeEntryStyles = StyleSheet.create({
		entryContainer: {
			marginBottom: 16,
		},
		headerContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginBottom: "8pt",
		},
		labelContainer: {
			flexDirection: "row",
		},
		labelText: {
			fontSize: headingFontSize,
			fontFamily: "Figtree",
			marginRight: "4pt",
		},
		subLabelText: {
			fontSize: headingFontSize,
			marginLeft: "4pt",
			fontFamily: "Lato",
		},
		timeText: {
			fontSize: headingFontSize,
			fontFamily: "Lato",
		},
		childrenContainer: {
			marginLeft: 4,
		},
	});

	return (
		<View style={resumeEntryStyles.entryContainer}>
			<View style={resumeEntryStyles.headerContainer}>
				<View style={resumeEntryStyles.labelContainer}>
					<Text style={resumeEntryStyles.labelText}>{label}</Text>
					<Text style={{ fontFamily: "Figtree", fontSize: headingFontSize }}>
						|
					</Text>
					<Text style={resumeEntryStyles.subLabelText}>{sublabel}</Text>
				</View>
				<Text style={resumeEntryStyles.timeText}>({time})</Text>
			</View>
			<View style={resumeEntryStyles.childrenContainer}>{children}</View>
		</View>
	);
}

function SkillCategory({ title, skillList }) {
	return (
		<View style={{ marginBottom: "12pt" }}>
			<Text
				style={{
					fontSize: headingFontSize,
					fontFamily: "Figtree",
					marginRight: "4pt",
					marginBottom: "4pt",
				}}
			>
				{title}
			</Text>
			<Text
				style={{
					fontSize: bodyFontSize,
					fontFamily: "Lato",
					marginRight: "4pt",
				}}
			>
				{skillList.join(", ")}
			</Text>
		</View>
	);
}

export default function PDFResume({
	text
}) {
	return (
		<Document>
			<Page size="LETTER">
				<View style={{ margin: "12pt" }}>
					<View style={{ height: "12pt", backgroundColor: "#000000" }} />
					<Header text={text} />
					<View style={{ flexDirection: "row" }}>
						<View style={{ width: "70%" }}>
							<ResumeSection title="professional experience">
								<Job text={text} company="job1" />
								<Job text={text} company="job2" />
							</ResumeSection>
						</View>
						<View style={{ width: "30%" }}>
							<ResumeSection title="Skills">
								<SkillCategory title="Tech" skillList={text.skills.tech} />
								<SkillCategory title="Other Tech" skillList={text.skills.otherTech} />
							</ResumeSection>
							<ResumeSection title="Portfolio">
								<View style={{ flexDirection: "row", marginBottom: "8pt" }}>
									<Text
										style={{
											fontSize: headingFontSize,
											fontFamily: "Figtree",
											marginRight: "4pt",
										}}
									>
										Github
									</Text>
									<Text
										style={{ fontFamily: "Figtree", fontSize: headingFontSize }}
									>
										|
									</Text>
									<Text
										style={{
											fontSize: headingFontSize,
											marginLeft: "4pt",
											fontFamily: "Lato",
										}}
									>
										{text.portfolio.github.title}
									</Text>
								</View>
							</ResumeSection>
							<ResumeSection title="Education">
								<View style={{ marginBottom: "4pt" }}>
									<Text
										style={{
											fontSize: bodyFontSize,
											fontFamily: "Figtree",
											marginBottom: "4pt",
										}}
									>
										{text.education.name}
									</Text>
									<Text style={{ fontSize: bodyFontSize, fontFamily: "Lato" }}>
										{text.education.degree} in {text.education.major}
									</Text>
								</View>
							</ResumeSection>
						</View>
					</View>
					{/* <View
						style={{
							marginTop: "92pt",
							height: "12pt",
							backgroundColor: "#000000",
						}}
					/> */}
				</View>
			</Page>
		</Document>
	);
}