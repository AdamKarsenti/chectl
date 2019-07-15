# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
# PLEASE REMOVE ALL GENERATED COMMENTS BEFORE SUBMITTING YOUR PULL REQUEST!
class Chectl < Formula
  desc "CLI to manage Eclipse Che server and workspaces"
  homepage ""
  url "https://github.com/che-incubator/chectl/releases/download/20190701164846/chectl-v0.0.2-6c96c58-darwin-x64.tar.gz"
  sha256 "27e53835c1ee31056411aeea39f68d5afe59cd9fe7a5fb856732d1217d130b26"
  depends_on "yarn" => :build
  depends_on "p7zip" => :build

  def install

    system "npm", "install", "-g", "pkg@4.3.8"
    sytem "yarn" , "pack"





  end

  test do
    # `test do` will create, run in and delete a temporary directory
    #
    # This test will fail and we won't accept that! For Homebrew/homebrew-core
    # this will need to be a test that verifies the functionality of the
    # software. Run the test with `brew test chectl`. Options passed
    # to `brew install` such as `--HEAD` also need to be provided to `brew test`.
    #
    # The installed folder is not in the path, so use the entire path to any
    # executables being tested: `system "#{bin}/program", "do", "something"`.
    system "false"
  end
end
